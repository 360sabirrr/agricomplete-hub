-- Migration: normalize auth fields and enforce unique phone numbers.
-- Run this on an existing PostgreSQL database after backing up data:
-- psql -U agri_user -d agricomplete_hub -f backend/db/04_add_auth_constraints.sql

UPDATE "user"
SET email = LOWER(TRIM(email));

UPDATE "user"
SET phone = NULL
WHERE phone IS NOT NULL AND TRIM(phone) = '';

UPDATE "user"
SET phone = regexp_replace(TRIM(phone), '[[:space:]().-]+', '', 'g')
WHERE phone IS NOT NULL;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "user"
    WHERE phone IS NOT NULL
    GROUP BY phone
    HAVING COUNT(*) > 1
  ) THEN
    RAISE EXCEPTION 'Duplicate phone numbers exist. Resolve duplicates before adding the unique phone index.';
  END IF;
END;
$$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_phone_unique
ON "user"(phone)
WHERE phone IS NOT NULL;
