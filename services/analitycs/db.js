var mongo = require('mongodb').MongoClient;
var url = "mongodb://root:example@mongo:27017/";

var db;

mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db('tests');
  })
  

function InsertInteraction (data, cb) {
            db.collection('interaction_recording').insertOne({
            event: data.event,
            userid: data.id,
            Timestamp: new Date(),
        }, function (err) {
            if(err) cb(false);
            else cb(true);
        });
}


module.exports = {
    InsertInteraction,
}
