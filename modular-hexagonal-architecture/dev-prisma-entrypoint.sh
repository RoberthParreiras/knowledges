#!/bin/sh

# Docker Compose's healthcheck has already ensured the database is ready.
echo "Database is ready, running migrations..."

# Apply database migrations
cd src/common/lib/prisma && bunx prisma migrate dev

echo "Migrations complete, starting application..."

# Execute the command passed to the script (i.e., the Dockerfile's CMD)
exec "$@"