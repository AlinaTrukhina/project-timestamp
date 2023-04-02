// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const mySecret = process.env['PORT'];

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

function isValidDate(dateObject){
    return new Date(dateObject).toString() !== 'Invalid Date';
}

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  if (date == "" || typeof date == "undefined") {
    let utcDate = new Date();
    let unixDate = Date.parse(utcDate);
    res.json({"unix": unixDate,
             "utc": utcDate});
  } 
  else {
    let validDate = Number(date);
    let stringDate = date.toString();
    // console.log(typeof validDate, validDate);
    // console.log(isValidDate(validDate));
    // console.log(isValidDate(stringDate));
    if (isValidDate(validDate) == false &&       isValidDate(stringDate) == false) {
      res.json({"error": "Invalid Date" })
    } 
    else {
    let unixDate;
    let utc = date;
    utc = Number(utc);
    if (Number.isNaN(utc)) {
      utc = new Date(date);
      utc = utc.toUTCString();
    } else {
      utc = new Date(utc);
      utc = utc.toUTCString();
    }
    unixDate = new Date(date);
    unixDate = Date.parse(unixDate);
    if (Number.isNaN(unixDate)) {
      unixDate = date;
      unixDate = Number(unixDate);
    }
    
    res.json({
      unix: unixDate,
      utc: utc
    });
  }
  }
  
});

  // let newdate = new Date("300");
  // console.log(newdate);
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app;