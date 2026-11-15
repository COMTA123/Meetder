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


app.listen(port, () => {
  console.log(`Starting server at port ${port}`);
});