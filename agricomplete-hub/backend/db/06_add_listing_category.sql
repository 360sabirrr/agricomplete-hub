-- Migration: Add category support to marketplace listings.
ALTER TABLE market_listing
  ADD COLUMN IF NOT EXISTS category VARCHAR(50);
