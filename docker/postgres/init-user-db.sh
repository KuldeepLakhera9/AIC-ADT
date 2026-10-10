#!/bin/bash
set -e

# ==============================================================================
# AIC-ADT Baramati Foundation — PostgreSQL Database Initialization Script
# Executed automatically during initial container startup by official postgres image.
# Provisions the application database and a dedicated non-superuser role.
# ==============================================================================

APP_DB_NAME="${APP_DB_NAME:-aic_adt_db}"
APP_DB_USER="${APP_DB_USER:-aic_app}"
APP_DB_PASSWORD="${APP_DB_PASSWORD:-aic_app_dev_password}"

echo ">>> [AIC-ADT] Initializing dedicated PostgreSQL role: ${APP_DB_USER}..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- 1. Create dedicated non-superuser application role with least privileges
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = '${APP_DB_USER}') THEN
            CREATE ROLE ${APP_DB_USER} WITH LOGIN PASSWORD '${APP_DB_PASSWORD}' NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT;
            RAISE NOTICE 'Role ${APP_DB_USER} created successfully.';
        ELSE
            RAISE NOTICE 'Role ${APP_DB_USER} already exists.';
        END IF;
    END
    \$\$;

    -- 2. Create dedicated application database if it does not exist
    SELECT 'CREATE DATABASE ${APP_DB_NAME} ENCODING ''UTF8'''
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${APP_DB_NAME}')\gexec

    -- 2b. Create shadow database for development migrations
    SELECT 'CREATE DATABASE ${APP_DB_NAME}_shadow ENCODING ''UTF8'''
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${APP_DB_NAME}_shadow')\gexec

    -- 3. Grant connection privileges to the application role
    GRANT CONNECT, TEMPORARY ON DATABASE ${APP_DB_NAME} TO ${APP_DB_USER};
    GRANT CONNECT, TEMPORARY ON DATABASE ${APP_DB_NAME}_shadow TO ${APP_DB_USER};
EOSQL

echo ">>> [AIC-ADT] Configuring schema permissions in database: ${APP_DB_NAME}_shadow..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "${APP_DB_NAME}_shadow" <<-EOSQL
    GRANT ALL ON SCHEMA public TO ${APP_DB_USER};
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${APP_DB_USER};
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ${APP_DB_USER};
EOSQL

echo ">>> [AIC-ADT] Configuring schema permissions in database: ${APP_DB_NAME}..."

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$APP_DB_NAME" <<-EOSQL
    -- 4. Harden public schema: Revoke public execution and grant controlled access
    REVOKE ALL ON SCHEMA public FROM PUBLIC;
    GRANT USAGE, CREATE ON SCHEMA public TO ${APP_DB_USER};

    -- 5. Grant DML and sequence usage on existing objects
    GRANT ALL ON ALL TABLES IN SCHEMA public TO ${APP_DB_USER};
    GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ${APP_DB_USER};
    GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO ${APP_DB_USER};

    -- 6. Configure default privileges for future objects created in public schema
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ${APP_DB_USER};
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO ${APP_DB_USER};
    ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO ${APP_DB_USER};
EOSQL

echo ">>> [AIC-ADT] Dedicated role ${APP_DB_USER} and database ${APP_DB_NAME} provisioned successfully."
