const MongoClient = require('mongodb').MongoClient;

const url =require('./keys').uri;

const dbName = 'proj1';


MongoClient.connect(url, function(err, client) {
    // assert.equal(null, err);
    console.log("Connected successfully to server");
   
    const db = client.db(dbName);
   
    // client.close();
  });