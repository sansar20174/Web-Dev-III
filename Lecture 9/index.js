const express = require('express');

const app = express();

app.get('/student', (req, res) => {
    res.send('Request received');
});

app.listen(3000, () =>{
    console.log("Server is running on port 3000");
});