//jshint esversion:6
// Packages require
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// Require the database
const connection = require('../database/database');

// Require the controllers
const client = require('../database/controllers/controller');

// Set view engine , body parser and the public folder
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

router.get('/clientlist', async (req, res) => {
    result = await client.clientList();
    res.render('clientlist', { allClients: result });
});

// Exportation of this router
module.exports = router;
