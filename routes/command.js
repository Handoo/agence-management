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

router.get('/command', (req, res) => {
    res.render('command');
});

router.post('/command', (req, res) => {
    console.log(req.body);
    
    client.addClient(req);
    res.render('command');
});

router.post('/pieces-required', async (req, res) => {
    let per = req.body.typePersonne;
    let pp = req.body.typePassport;
    let Pieces = await client.requiredPieces(per, pp);
    res.json(Pieces);
});

// Exportation of this router
module.exports = router;
