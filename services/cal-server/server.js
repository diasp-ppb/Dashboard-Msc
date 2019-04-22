var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var PORT = 3002; 

let data = require('./data');
var JsonData = [];
data.readRawData(function(data) {
    JsonData.push(data);
    console.log(data);
});

app.use(cors()); //REDO FOR PRODUCTION 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', function(req, res){
    res.json({ info: 'CAL-SERVER <3' })
});



app.get('/getTheme/:themeId', getTheme);


app.get('/getThemeCompressed/:themeId', getCompressedTheme);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
});



function getCompressedTheme(req, res) {
    let themeId = req.params.themeId;
    let path = data.ZIPPED_DATA_PATH+"/T"+themeId+".tar.gz";

    res.download(path);
}

function getTheme(req, res) {
   let themeId = req.params.themeId;
   let data = JsonData.find(function(element) {
        return element.id = themeId;
   }) || {};

   res.send(JSON.stringify(data));
}


