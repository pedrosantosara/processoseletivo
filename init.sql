DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'bd_app_cadastro') THEN
        CREATE DATABASE bd_app_cadastro;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin') THEN
        CREATE USER admin WITH ENCRYPTED PASSWORD 'admin';
    END IF;
END $$;

GRANT ALL PRIVILEGES ON DATABASE bd_app_cadastro TO admin;
