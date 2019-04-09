const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5005
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const cors = require ('cors');
const ConnectionURL = "mongodb+srv://tjaketheman:owner1@mycluster-zfcy6.mongodb.net/test?retryWrites=true";
const dbName = "Pantrack";

var database, collection;

app.listen(port, () => {
    MongoClient.connect(ConnectionURL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(dbName);
        collection = database.collection("Users");
        console.log("Connected to `" + dbName + "`!");
    });
});



// app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }));


app.post('/createaccount', cors(), (req, res) => {
    const body = req.body
    collection.insertOne(body, (error, result) => {
        if(error) {
            return Response.status(500).send(error);
        }
        res.status(200).send(body)
    })
})

// app.get("/person/:id", (request, response) => {
//     collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });

// app.get("/people", (request, response) => {
//     collection.find({}).toArray((error, result) => {
//         if(error) {
//             return response.status(500).send(error);
//         }
//         response.send(result);
//     });
// });

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
