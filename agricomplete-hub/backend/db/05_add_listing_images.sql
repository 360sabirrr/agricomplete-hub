-- Migration: Add image support to marketplace listings.
-- psql -U agri_user -d agricomplete_hub -f backend/db/05_add_listing_images.sql

ALTER TABLE market_listing
ADD COLUMN IF NOT EXISTS image_data TEXT;
