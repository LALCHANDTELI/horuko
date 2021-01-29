const express = require('express')
const app = express()
const mongo = require('mongodb')
const mongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
let db;
const port = process.env.PORT || 3000;

mongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (error, connection) => {
    if (error) throw error;
    db = connection.db('board');
})

app.listen(port, (error) => {
    if (error) throw error;
})

app.get('/', (req, res) => {
    if (req.query.assignments) {
        db.collection('studentsBoard').find().toArray((error, result) => {
            if (error) throw error;
            let sortAssignments = [];

            for (data of result) {
                if (data.assignments.length == req.query.assignments) {
                    sortAssignments.push(data.assignments)
                    console.log(data.assignments);
                }
            }
            res.send(sortAssignments)

        })

    } else {
        db.collection('studentsBoard').find().toArray((error, result) => {
            if (error) throw error;
            res.send(result)
        })

    }

})

app.get('/:name', (req, res) => {
    const name = req.params.name;
    db.collection('studentsBoard').find({ name: name }).toArray((error, result) => {
        if (error) throw error;
        if (result.length === 0) {
            res.send("user not found error 404");
        } else {
            res.send(result)
        }

    })
})


app.get('/:name/:directory', (req, res) => {
    const name = req.params.name;
    const directory = req.params.directory;
    db.collection('studentsBoard').find({ name: name }).toArray((error, result) => {
        if (error) throw error;
        const filter = result.map((data) => { if (directory == "tasks") { return data.tasks } if (directory == "assignments") { return data.assignments } else { return "page not found error 404" } });
        res.send(filter);
    })
})