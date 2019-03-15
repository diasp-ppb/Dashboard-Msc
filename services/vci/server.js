var express = require('express');
var app = express();
var PORT = 3001; 

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/contagem', function (req, res) {
    res.send('contagem');
});

app.get('/tripdistribution/:zone1/:zone2', function (req, res) {
    res.send('tripdistribution');
});

app.get('/zonecoordinates/:zone', function (req, res) {
    res.send('55qwiisdadasdasse');
});

app.listen(PORT);

