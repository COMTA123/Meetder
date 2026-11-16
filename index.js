const express = require("express");
const path = require("path");
const port = 3000;

// Creating the Express server
const app = express();

// Connect to database
const pool = require("./db");
pool
  .query("SELECT NOW()")
  .then((r) => console.log("PostgreSQL connected:", r.rows[0].now))
  .catch((err) => console.error("PostgreSQL connection failed:", err.message));

// static resourse & templating engine
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render("landingPage")
});
app.get('/meetCreation', function (req, res) {
    res.render("meetingCreation")
});

app.post('/meeting/create', async function (req, res) {
    const toArray = (v) => (v === undefined ? [] : Array.isArray(v) ? v : [v]);
    const titles = toArray(req.body.agendaTitle);
    const times = toArray(req.body.agendaTime);
    const details = toArray(req.body.agendaDetail);

    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        // host_id = 0 is a placeholder until login exists; note stays NULL until the meeting ends
        const meeting = await client.query(
            "INSERT INTO meeting (host_id, meeting_name, status, note) VALUES ($1, $2, $3, NULL) RETURNING id",
            [0, (req.body.meeting_name || "").trim() || "Untitled meeting", "starting"]
        );
        const meetingId = meeting.rows[0].id;

        for (let i = 0; i < titles.length; i++) {
            await client.query(
                "INSERT INTO agenda (title, time, description, meeting_id) VALUES ($1, $2, $3, $4)",
                [titles[i], parseInt(times[i], 10) || 0, details[i] || "", meetingId]
            );
        }
        await client.query("COMMIT");
        res.redirect("/");
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Create meeting failed:", err.message);
        res.status(500).send("Could not create meeting");
    } finally {
        client.release();
    }
});

app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});