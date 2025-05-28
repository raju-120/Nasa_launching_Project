const express = require('express');
const { getAllPlanets } = require('./planet.controller.js');


const planetRouter = express.Router();

planetRouter.get('/planets', getAllPlanets);


module.exports = planetRouter;