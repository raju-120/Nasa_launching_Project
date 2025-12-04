const launchesDataBase = require('./launches.mongo');

const launches = new Map();

let latestFlightNumber = 100;

const launch={
    flightNumber:100,
    mission: "Kepler Exploration X",
    rocket:"Explorer IS1",
    launchDate:new Date('December 27, 2030'),
    target: "Kepler-442 b",
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
}

saveLaunchData(launch);  //Saved into  the DB
// launches.set(launch.flightNumber, launch);

//
function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

//Get all the launches without passing the actual model data
async function getAllLaunches(){
    return await launchesDataBase
                .find({},{
                    '_id': 0,
                    '__v': 0,
                });
}

//Saved into the DB
async function saveLaunchData(launch){
    await launchesDataBase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch ,{
        upsert: true,
    })
}

//For set up to the db
function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch,{
            success: true,
            upcoming: true,
            customer: ['Mastery', 'NASA'],
            flightNumber: latestFlightNumber,
        })
    )
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}