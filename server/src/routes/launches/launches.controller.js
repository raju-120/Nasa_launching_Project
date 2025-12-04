const {
        getAllLaunches, 
        addNewLaunch,
        existsLaunchWithId,
        abortLaunchById,
    } = require('../../models/launches.model.js')


//Get all the launches item
async function httpGetAllLaunches(req, res){
    return res.status(200).json(await getAllLaunches());
}

// Post a New added launch
function httpAddNewLaunch(req, res){
    const launch = req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: 'Missing require launch property'
        })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid Launch Date'
        })
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
}

//Delete a posted upcoming launch
function httpAbortLaunch(req,res){
    const launchId = Number(req.params.id);

    if(!existsLaunchWithId(launchId)){
        //if launch id doesn't exist
        return res.status(404).json({
            error: 'launch not found'
        });
    }
    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}