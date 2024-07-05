const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// API endpoint to handle date requests
app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;
  let date;

  // If no date is provided, use the current date
  if (!dateString) {
    date = new Date();
  } else if (!isNaN(dateString)) {
    // If the date is a Unix timestamp (milliseconds since epoch)
    date = new Date(parseInt(dateString));
  } else {
    // Otherwise, try to parse the date string
    date = new Date(dateString);
  }

  // If the date is invalid, return an error
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    // Otherwise, return the Unix timestamp and UTC date string
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
