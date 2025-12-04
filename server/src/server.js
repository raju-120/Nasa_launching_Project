const env = require("dotenv");
const mongoose = require("mongoose");
const http = require('http');
const app = require('./app');


const {loadPlanetsData} = require("./models/planet.model.js")

const PORT = process.env.PORT || 8000;

env.config({path: ".env.local"});

//MongoDB Connection URL
const MONGO_URL= process.env.MONGODB_URL;
const server = http.createServer(app);

// Check if MongoDB connected
mongoose.connection.once('open',()=>{
    console.log("MONGODB Connection is ready.")
});
mongoose.connection.on('error', (err)=>{
    console.error("MongoDb is not connect: ",err.message);
})

async function startServer() {
  // Connect to DB (NO OLD OPTIONS)
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");

    await loadPlanetsData();

    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to connect MongoDB:", err.message);
  }
}

startServer();
