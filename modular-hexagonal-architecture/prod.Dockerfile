# Stage 1: Build the application
FROM oven/bun:1 AS builder

RUN apt-get update && apt-get install -y openssl

# Pass secrets and environment variables as build arguments
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG DATABASE_URL
ARG SENTRY_AUTH_TOKEN

# Set them as environment variables for the build process
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
ENV CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN bunx prisma generate --schema=./src/common/lib/prisma/schema.prisma
RUN bun run build

# Add this line to fix permissions
RUN chmod -R 755 ./.next/static

# Stage 2: Create the production image
FROM oven/bun:1 AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y dos2unix ca-certificates

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/common/lib/prisma/schema.prisma ./src/common/lib/prisma/schema.prisma
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client

COPY prod-prisma-entrypoint.sh .


RUN dos2unix ./prod-prisma-entrypoint.sh
RUN chmod +x ./prod-prisma-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./prod-prisma-entrypoint.sh"]

CMD [ "bun", "server.js" ]