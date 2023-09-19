const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
const db = require('./database/db');

const cors = require('cors');

app.use(cors());

const apiRoutes = require('./routes');
app.use('/',apiRoutes);

app.listen(500,(err)=>{
    console.log("Connected to Server")
});