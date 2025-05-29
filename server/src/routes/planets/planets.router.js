const express = require('express');
const { httpGetAllPlanets } = require('./planet.controller.js');


const planetRouter = express.Router();

planetRouter.get('/', httpGetAllPlanets);


module.exports = planetRouter;