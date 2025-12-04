const fs = require('fs');
const path = require('path'); // Use the 'path' module to resolve file paths
const { parse } = require('csv-parse');

const planets = require('./planets.mongo.js');


// const habitablePlanet = [];

function isHabitablePlanet(planet) {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv');

    fs.createReadStream(filePath)
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async(data) => {
        // console.log('CSV columns:', Object.keys(data)); // See all column names
        // console.log('Sample data:', data); // See sample row
        
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      // .on('data', async(data) => {
      //   if (isHabitablePlanet(data)) {
      //     // habitablePlanet.push(data);
      //     // to do:Replace below create with insert + update = upsert
      //     // console.log('DATA saved in save planet data: ', data) 
      //     savePlanet(data);
      //   }
      // })
      .on('error', (err) => {
        console.error('Error reading CSV:', err);
        reject(err);
      })
      .on('end', async() => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({},{
    '__v': 0, '__v':0
  })
}

async function savePlanet(planet){
  try{
    await planets.updateOne({
      keplerName: planet['kepler_name'],  // Changed from data to planet
    },{
      $set:{
        keplerName: planet['kepler_name'],  // Changed from data to planet
      }
    },{
      upsert: true,
    });
    //  console.log(`✓ Saved planet: ${planet['kepler_name']}`); // Add this
  }catch(err){
    console.error(`Could not save the planet ${err.message}`)
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets
};
