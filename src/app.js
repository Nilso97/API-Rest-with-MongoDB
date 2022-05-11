const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const CONNECTION_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'DB_userRegistration';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let database, collection;

/**POST*/
app.post('/users', (req, res) => {
    collection.insert(req.body, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    });
});

/**GET*/
app.get('/users', (req, res) => {
    collection.find({}).toArray((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    });
});

/**GET*/
app.get('/users/:id', (req, res) => {
    collection.findOne({
        '_id': new ObjectId(req.params.id)
    }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    });
});

// Connection with MongoDB
app.listen(3333, () => {
    MongoClient.connect(CONNECTION_URL, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            throw err;
        }
        database = client.db(DATABASE_NAME);
        console.log(`connected MongoDB at server: ${CONNECTION_URL}`);
        console.log(`database name: ${DATABASE_NAME}`);

        client.close();
    });
});