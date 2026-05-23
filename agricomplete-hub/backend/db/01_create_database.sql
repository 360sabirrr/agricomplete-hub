-- Run as a superuser (e.g., postgres):
-- psql -U postgres -f backend/db/01_create_database.sql

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'agri_user') THEN
    CREATE ROLE agri_user LOGIN PASSWORD 'change_me_now';
  END IF;
END $$;

-- CREATE DATABASE cannot run inside DO/transaction block.
-- This statement is idempotent when used with psql's \gexec trick:
SELECT 'CREATE DATABASE agricomplete_hub OWNER agri_user'
WHERE NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'agricomplete_hub')\gexec

GRANT ALL PRIVILEGES ON DATABASE agricomplete_hub TO agri_user;
