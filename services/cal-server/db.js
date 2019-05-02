var mongo = require('mongodb').MongoClient;
var url = "mongodb://root:example@mongo:27017/";

var db;

mongo.connect(url, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    db = client.db('downloads');
  })
  

function InsertReason (data, cb) {
            db.collection('cal').insertOne({
            reason: data.reason,
            dataId: data.dataId,
            Timestamp: new Date(),
        }, function (err) {
            if(err) cb(false);
            else cb(true);
        });
}


module.exports = {
    InsertReason,
}
