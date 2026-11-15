const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://meetion:meetion_pass@localhost:5432/meetion",
});

pool.on("error", (err) => console.error("Unexpected PG error:", err));

module.exports = pool;
