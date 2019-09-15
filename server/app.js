const io = require('socket.io')();
var MongoClient = require('mongodb').MongoClient;
var mongoConnectionString = "mongodb+srv://cuebook:test123@cluster0-xajwk.mongodb.net/test?retryWrites=true&w=majority";
var databaseName = "reactgame";

function insertKeyData(data){
    MongoClient.connect(mongoConnectionString, function(err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection("keypress").insertOne(data, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

io.on('connection', (client) => {
  client.on('recordKey', (data) => {
    console.log(data);
    insertKeyData(data);
  });
});

const port = 55550;
io.listen(port);
console.log('listening on port ', port);