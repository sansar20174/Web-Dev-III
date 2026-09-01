const express = require('express');
const app = express();
app.use(express.json());

// CRUD Operations:- Create, Read, Update, Delete

// Read Operation

let students = ["Rahul", "Aashit", "Bunty"];
app.get('/students', (req, res) => {
    res.status(200).send(students);
});

// Create Operation
app.post('/students', (req, res) => {
    let data = req.body.name;

    students.push(data);
    res.status(200).send("Student added successfully");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Update Operation
app.put('/students/:index', (req, res) => {
    let index = req.params.index;
    let data = req.body.name;
    students[id] = data;
    res.status(200).send("Student updated successfully");
})