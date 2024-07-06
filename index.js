// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toString() === "Invalid Date";

// API endpoint to handle date requests
app.get("/api/:date?", function (req, res) {
  let date;

  // If no date is provided, use the current date
  if (!req.params.date) {
    date = new Date();
  } else if (!isNaN(req.params.date)) {
    // If the date is a Unix timestamp (in milliseconds)
    date = new Date(parseInt(req.params.date));
  } else {
    // Otherwise, try to parse the date string
    date = new Date(req.params.date);
  }

  // If the date is invalid, return an error
  if (isInvalidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  // Return the Unix timestamp and UTC date string
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
