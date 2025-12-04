const {getAllPlanets} = require('../../models/planet.model.js');

async function httpGetAllPlanets(req, res){
   // console.log(`first ${getAllPlanets.length}`)
   return res.status(200).json(await getAllPlanets());
};


module.exports = {
   httpGetAllPlanets
};