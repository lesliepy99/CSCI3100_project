const express = require('express');
const app = express();
const db = require('./database');

app.use(express.static(__dirname + '/build'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html')
});

app.listen(3000);