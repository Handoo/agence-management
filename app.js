require('dotenv').config();
//jshint esversion:6
// Packages require
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// Require the controllers
const analytics = require('./database/controllers/analytics');

const app = express();

// Set view engine , body parser and the public folder
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));



// Routers
app.use(require('./routes/command'));
app.use(require('./routes/clientlist'));
// app.use(require('./database/controllers/analytics'));

// Homepage
app.get('/', async (req, res) => {
    numberOfCLients = await analytics.numberOfCLients();
    numberClientPerMonth = await analytics.numberOfCLientsPerMonth();
    listNewPassport = await analytics.listNewPassport();
    listReNewPassport = await analytics.listReNewPassport();

    params = {
        numberOfCLients: numberOfCLients,
        numberClientPerMonth: numberClientPerMonth,
        listNewPassport: listNewPassport,
        listReNewPassport: listReNewPassport,
    };
    
    res.render('home', params);
});

// Server start
PORT = process.env.PORT;
app.listen(PORT || 8080, () => {
    console.log(' Server started at port ' + PORT);
});