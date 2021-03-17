const express = require('express');
const mongoose = require('mongoose');

require('dotenv/config');
const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());

const PORT = 5000;

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('DB Connected');
    app.listen(process.env.PORT || PORT, () => {
        console.log('Server is Connected');
    })
});