Day1 : 11/11/69
- meetingCreation added

## How to run

### Option 1: Docker (recommended)

Requires Docker and Docker Compose.

```bash
docker compose up --build
```

- App: http://localhost:3000
- Adminer (DB UI): http://localhost:8080 (server `db`, default user/password/db: `meetion` / `meetion_pass` / `meetion`)
- PostgreSQL: `localhost:5432`

Override credentials by setting `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB` in `.env`.

Stop with `docker compose down` (add `-v` to also delete the database volume).

### Option 2: Local

Requires Node.js and a running PostgreSQL instance.

```bash
npm install
node index.js
```

The app connects using `DATABASE_URL` (default `postgres://meetion:meetion_pass@localhost:5432/meetion`) and listens on `PORT` (default 3000). Create the tables first using the SQL files in `db/migration`.
