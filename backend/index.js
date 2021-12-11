var express = require('express');
var app = express();
var mongoose = require('mongoose');
const logger = require('morgan');
const PORT = process.env.PORT || 3000;
var cors = require('cors')

const connString = `mongodb://localhost:27017/test`;

mongoose.connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }))
app.use(require('./routes/user'));



app.listen(PORT, () => {
    console.log(`Listening at PORT ${PORT}`)
})