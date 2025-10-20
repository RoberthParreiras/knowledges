#!/bin/sh

# Docker Compose's healthcheck has already ensured the database is ready.
echo "Database is ready, running migrations..."

# Apply database migrations
bunx prisma migrate dev --schema=./src/common/lib/prisma/schema.prisma

echo "Migrations complete, starting application..."

# Execute the command passed to the script (i.e., the Dockerfile's CMD)
exec "$@"