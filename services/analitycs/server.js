const express = require('express');
const app = express();
const port = 3005;


const bodyParser = require('body-parser');
const cors = require('cors');

let db = require('./db');


app.use(cors()); //REDO FOR PRODUCTION 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, function() {
	console.log("serveer running on" + port);
});



app.get('/', function(req, res){
	res.json({ info: 'Analytics <3' })
});


app.post('/recordInteraction', saveInteraction); 



function saveInteraction(req,res) {
	let body = req.body;
  
	if(body.id && body.event) {
	  db.InsertInteraction(body, function(result) {
		if(result) {
			console.log("inserted");
		  res.send(200);
		}
		else {
			console.log("500");
		  res.send(500);
		}
	  })
	} else {
		console.log("400");
	  res.send(400);
	}
  }