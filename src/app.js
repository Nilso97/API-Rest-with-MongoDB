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

// CONNECTION WITH MONGODB
app.listen(3333, () => {
    MongoClient.connect(CONNECTION_URL, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            throw err;
        }

        database = client.db(DATABASE_NAME);
        console.log(`Connected with MongoDB at ${CONNECTION_URL}`);
        console.log(`Database name: ${DATABASE_NAME}`);

        client.close();
    });
});


// ADD users
app.post('/users', (req, res) => {
    collection.insert(req.body, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    });
});

// LIST ALL users
app.get('/users', (req, res) => {
    collection.find({}).toArray((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    });
});

// LIST ONLY ONE user BY ID
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

// UPDATE user USING FIRST NAME SEARCH
app.patch('/users/:firstname', (req, res) => {
    collection.updateOne({
        'firstname': req.params.firstname
    }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    });
});

// DELETE user USING FIRST NAME SEARCH
app.delete('/users/:firstname', (req, res) => {
    collection.deleteOne({
        'firstname': req.params.firstname
    }, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send(result);
    });
});
