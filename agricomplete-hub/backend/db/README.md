# PostgreSQL Setup (PL/pgSQL)

## 1) Create role + database
```bash
psql -U postgres -f backend/db/01_create_database.sql
```

## 2) Create schema + procedures/functions
```bash
psql -U agri_user -d agricomplete_hub -f backend/db/02_schema_and_procedures.sql
```

## 3) Set backend database URL
Use this in `.env`:
```env
DATABASE_URL=postgresql+psycopg2://agri_user:change_me_now@localhost:5432/agricomplete_hub
```

## PL/pgSQL objects created
- `sp_update_user_profile(...)`
- `sp_mark_alerts_read(...)`
- `fn_unread_alert_count(user_id)`
