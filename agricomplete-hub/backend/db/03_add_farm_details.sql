-- Migration: Add farm detail columns to existing user table
-- Run this if you already have the user table created:
-- psql -U agri_user -d agricomplete_hub -f backend/db/03_add_farm_details.sql

ALTER TABLE "user" 
ADD COLUMN IF NOT EXISTS total_area VARCHAR(50),
ADD COLUMN IF NOT EXISTS soil_type VARCHAR(75),
ADD COLUMN IF NOT EXISTS irrigation_source VARCHAR(100),
ADD COLUMN IF NOT EXISTS primary_crops VARCHAR(150),
ADD COLUMN IF NOT EXISTS farming_type VARCHAR(100);
