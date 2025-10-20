# Stage 1: Build the application
FROM oven/bun:1 AS builder

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

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

RUN apt-get update && apt-get install -y dos2unix openssl ca-certificates

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