const mongoose= require("mongoose");

const launchesSchema = mongoose.Schema({
    flightNumber: {
        type: Number,
        required : true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission:{
        type: String,
        required: true,
    },
    rocket:{
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    customers: {
        type: [String],
        required: true,
    }
    ,
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    }
});

// Connects launches Schema with the "Launches" collection
module.exports=mongoose.model('Launch', launchesSchema);