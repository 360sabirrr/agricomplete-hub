-- Run after creating database:
-- psql -U agri_user -d agricomplete_hub -f backend/db/02_schema_and_procedures.sql

-- Match SQLAlchemy table naming used in backend/models.py
CREATE TABLE IF NOT EXISTS "user" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(128) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(20),
  state VARCHAR(50),
  district VARCHAR(50),
  village VARCHAR(100),
  subscription VARCHAR(20) DEFAULT 'Basic',
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crop (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  planted_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  harvest_date TIMESTAMP WITHOUT TIME ZONE,
  status VARCHAR(50) DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS market_listing (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  crop_name VARCHAR(100) NOT NULL,
  price DOUBLE PRECISION NOT NULL CHECK (price >= 0),
  quantity VARCHAR(50) NOT NULL,
  seller_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  location VARCHAR(100),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS farm_alert (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  priority VARCHAR(20),
  message VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_crop_user_id ON crop(user_id);
CREATE INDEX IF NOT EXISTS idx_market_listing_seller_id ON market_listing(seller_id);
CREATE INDEX IF NOT EXISTS idx_farm_alert_user_id ON farm_alert(user_id);
CREATE INDEX IF NOT EXISTS idx_farm_alert_user_unread ON farm_alert(user_id, is_read);

-- PL/pgSQL helper to update profile from SQL side.
CREATE OR REPLACE PROCEDURE sp_update_user_profile(
  p_user_id INTEGER,
  p_first_name VARCHAR(50),
  p_last_name VARCHAR(50),
  p_email VARCHAR(120),
  p_phone VARCHAR(20),
  p_state VARCHAR(50),
  p_district VARCHAR(50),
  p_village VARCHAR(100)
)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE "user"
  SET
    first_name = COALESCE(p_first_name, first_name),
    last_name = COALESCE(p_last_name, last_name),
    email = COALESCE(p_email, email),
    phone = COALESCE(p_phone, phone),
    state = COALESCE(p_state, state),
    district = COALESCE(p_district, district),
    village = COALESCE(p_village, village)
  WHERE id = p_user_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User id % not found', p_user_id;
  END IF;
END;
$$;

-- Mark all alerts as read for a user.
CREATE OR REPLACE PROCEDURE sp_mark_alerts_read(
  p_user_id INTEGER
)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE farm_alert
  SET is_read = TRUE
  WHERE user_id = p_user_id AND is_read = FALSE;
END;
$$;

-- Return unread alert count for quick dashboard fetch.
CREATE OR REPLACE FUNCTION fn_unread_alert_count(
  p_user_id INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM farm_alert
  WHERE user_id = p_user_id AND is_read = FALSE;

  RETURN v_count;
END;
$$;

