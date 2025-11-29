const http = require('http');
const app = require('./app');
const mongoose = require("mongoose");


const {loadPlanetsData} = require("./models/planet.model.js")

const PORT = process.env.PORT || 8000;

//MongoDB Connection
const MONGO_URL= "mongodb+srv://nasa-api:Go7Dgi10jfOahX4M@nasacluster.shoyjnu.mongodb.net/?appName=NASACluster"

const server = http.createServer(app);

// testing the DB is connect or not
mongoose.connection.once('open',()=>{
    console.log("MONGODB Connection is ready.")
});

mongoose.connection.on('error', (err)=>{
    console.error("MongoDb is not connect: ",err.message);
})

async function startServer(){
    //connect the DB
    await mongoose.connect(MONGO_URL,{
        // Those are options in the MONGODB Drivers.
        useNewUrlParser: true,
        userFindAndModify: false,
        useCreateUIndex: true,
        useUnifiedTopology: true,
    });
    await loadPlanetsData();

    server.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })
}

startServer();

//....