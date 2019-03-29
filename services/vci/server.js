var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var PORT = 3001; 

const db = require('./connection');

app.use(cors()); //REDO FOR PRODUCTION 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function(req, res){
    res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/contagem', db.getContagens);

app.get('/tripdistribution', db.getTripsDistributions);

app.get('/zonecoordinates/:zone', function (req, res) {
    res.send('55qwiisdadasdasse');
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
});

