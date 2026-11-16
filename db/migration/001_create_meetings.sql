-- Migration: 001_create_meetings
-- Source: db.dbml

CREATE TABLE IF NOT EXISTS meeting (
  id         SERIAL PRIMARY KEY,
  host_id    INTEGER,
  meeting_name TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status     TEXT,
  ended_at   TIMESTAMP,
  note       TEXT
);

CREATE TABLE IF NOT EXISTS agenda (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR,
  time        INTEGER,
  description TEXT,
  meeting_id  INTEGER REFERENCES meeting (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_agenda_meeting_id ON agenda (meeting_id);
