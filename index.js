const express = require("express");
const path = require("path");
const port = 3000;

// Creating the Express server
const app = express();

// Connect to SQLite database


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