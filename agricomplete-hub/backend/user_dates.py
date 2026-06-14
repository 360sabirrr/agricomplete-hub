from datetime import datetime, timezone

from sqlalchemy import func

from extensions import db


def user_created_at_utc(user):
    if not user.created_at:
        return None
    created_at = user.created_at
    if created_at.tzinfo is None:
        created_at = created_at.replace(tzinfo=timezone.utc)
    return created_at.astimezone(timezone.utc).isoformat().replace('+00:00', 'Z')


def backfill_missing_user_created_at():
    from models import (
        CropShieldCase,
        DiseaseScan,
        FarmAlert,
        MarketListing,
        PasswordResetToken,
        User,
    )

    users = User.query.all()
    if not users:
        return 0

    activity_sources = (
        (MarketListing, MarketListing.seller_id, MarketListing.created_at),
        (FarmAlert, FarmAlert.user_id, FarmAlert.created_at),
        (DiseaseScan, DiseaseScan.user_id, DiseaseScan.created_at),
        (PasswordResetToken, PasswordResetToken.user_id, PasswordResetToken.created_at),
        (CropShieldCase, CropShieldCase.user_id, CropShieldCase.created_at),
    )
    migration_time = datetime.now(timezone.utc).replace(tzinfo=None)
    repaired_count = 0

    for user in users:
        activity_dates = []
        for model, owner_column, date_column in activity_sources:
            earliest = (
                db.session.query(func.min(date_column))
                .select_from(model)
                .filter(owner_column == user.id)
                .scalar()
            )
            if earliest:
                activity_dates.append(earliest)

        earliest_activity = min(activity_dates) if activity_dates else None
        if earliest_activity and (
            user.created_at is None or earliest_activity < user.created_at
        ):
            user.created_at = earliest_activity
            repaired_count += 1
        elif user.created_at is None:
            user.created_at = migration_time
            repaired_count += 1

    if repaired_count:
        db.session.commit()
    return repaired_count
