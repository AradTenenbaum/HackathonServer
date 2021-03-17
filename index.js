const express = require('express');
const mongoose = require('mongoose');
const PORT = 5000;

const userRoute = require('./routes/users');
const resourceRoute = require('./routes/resources');

require('dotenv/config');
const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());

// Routes
app.use('/user', userRoute);
app.use('/resource', resourceRoute);

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('DB Connected');
    app.listen(process.env.PORT || PORT, () => {
        console.log('Server is Connected');
    })
});