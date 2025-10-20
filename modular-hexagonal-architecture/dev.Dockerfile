FROM oven/bun:1

# Install dos2unix to fix line endings
RUN apt-get update && apt-get install -y dos2unix
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

# Fix line endings and make the script executable
RUN dos2unix ./dev-prisma-entrypoint.sh
RUN chmod +x ./dev-prisma-entrypoint.sh

EXPOSE 3000

# Set the entrypoint to run the migration script on startup.
ENTRYPOINT ["./dev-prisma-entrypoint.sh"]

CMD ["bun", "run", "dev"]