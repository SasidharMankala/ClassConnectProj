var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello Worldewre!');
});
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
