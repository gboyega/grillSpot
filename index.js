const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./server/routes');

require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection:"));
db.once('open', () => {
    console.log('MongoDb database connection established');
});

routes(app);

app.listen(process.env.port || 7000, () => console.log('server listening on port 7000' ));