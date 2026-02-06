const launchesDataBase = require('./launches.mongo.js');

const DEFAULT_LAUNCH = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date('December 27, 2030'),
    target: "Kepler-442 b",
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
};

async function loadLaunchData() {
    const firstLaunch = await launchesDataBase.findOne({
        flightNumber: 100,
        mission: "Kepler Exploration X",
    });

    if (!firstLaunch) {
        console.log('Loading default launch data...');
        await saveLaunchData(DEFAULT_LAUNCH);
    } else {
        console.log('Launch data already loaded');
    }
}

// ✅ FIXED: Check by MongoDB _id
async function existsLaunchWithId(launchId) {
    return await launchesDataBase.findById(launchId);
}

async function getAllLaunches() {
    return await launchesDataBase.find({}, { '__v': 0 });
}

async function saveLaunchData(launch) {
    await launchesDataBase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDataBase
        .findOne()
        .sort('-flightNumber');
    
    if (!latestLaunch) {
        return 100;
    }
    
    return latestLaunch.flightNumber;
}

async function addNewLaunch(launch) {
    const latestFlightNumber = await getLatestFlightNumber();
    
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: launch.customers || ['Mastery', 'NASA'],
        flightNumber: latestFlightNumber + 1,
    });
    
    await saveLaunchData(newLaunch);
    
    return newLaunch;
}

// ✅ ACTUALLY DELETE from database
async function abortLaunchById(launchId) {
    const deleted = await launchesDataBase.deleteOne({ _id: launchId });
    
    console.log(`Delete result: ${deleted.deletedCount} document(s) deleted`);
    
    return deleted.deletedCount === 1;
}

module.exports = {
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
};