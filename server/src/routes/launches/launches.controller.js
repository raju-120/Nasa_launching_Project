const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model.js');

// Get all the launches
async function httpGetAllLaunches(req, res) {
    return res.status(200).json(await getAllLaunches());
}

// Post a new launch (FIXED VERSION - now async and awaits save)
async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    // Validation
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid Launch Date',
        });
    }

    try {
        // AWAIT the save operation
        const savedLaunch = await addNewLaunch(launch);
        return res.status(201).json(savedLaunch);
    } catch (error) {
        console.error('Error saving launch:', error);
        return res.status(500).json({
            error: 'Failed to save launch',
            message: error.message
        });
    }
}

// Delete a posted upcoming launch
async function httpAbortLaunch(req, res) {
    const launchId =req.params.id;

    console.log("Data ID: ", launchId)

    const existsLaunch = await existsLaunchWithId(launchId);
    if (!existsLaunch) {
        return res.status(404).json({
            error: 'Launch id is not found'
        });
    }

    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        });
    }

    return res.status(200).json({
        message:"Launch deleted Successfully"
    });
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}