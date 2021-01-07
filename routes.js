require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();
const users = require('./controller/user');

var options = { poolSize: 10, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000, useNewUrlParser: true ,  useUnifiedTopology: true };

MongoClient.connect(process.env.MONGO_URI, options, function (err, client) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Connected successfully to server");
        const db = client.db(process.env.DB_NAME);
        router.post('/register', (req, res) => users.register(req, res, db));
        router.get('/user/:id', (req, res, next) => authStrategy(req, res, db, next), (req, res) => users.profile(req, res, db));
    }
});
module.exports = router;
