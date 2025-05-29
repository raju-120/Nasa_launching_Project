const fs = require('fs');
const path = require('path'); // Use the 'path' module to resolve file paths
const { parse } = require('csv-parse');

const habitablePlanet = [];

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
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data);
        }
      })
      .on('error', (err) => {
        console.error('Error reading CSV:', err);
        reject(err);
      })
      .on('end', () => {
        console.log(`${habitablePlanet.length} habitable planets found!`);
        resolve(habitablePlanet);
      });
  });
}

function getAllPlanets () {
  return habitablePlanet;
}

module.exports = {
  loadPlanetsData,
  getAllPlanets
};
