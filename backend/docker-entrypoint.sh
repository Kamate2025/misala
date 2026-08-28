#!/bin/sh
set -e

# Make sure the sqlite volume's directory exists (SQLITE_PATH may point
# into a mounted, otherwise-empty named volume on first run).
mkdir -p "$(dirname "${SQLITE_PATH:-/app/data/db.sqlite3}")"

echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

exec "$@"
