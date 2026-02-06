const env = require("dotenv");
const mongoose = require("mongoose");
const http = require('http');
const app = require('./app');


const {loadPlanetsData} = require("./models/planet.model.js")
const {loadLaunchData } = require("./models/launches.model.js")

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
  try {
    if (!MONGO_URL) {
      throw new Error("MONGODB_URL environment variable is not set");
    }

    // Connect to DB
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 30000, // Give it more time
    });
    
    console.log("✅ MongoDB connected successfully");

    await loadPlanetsData();
    await loadLaunchData(); // Add this line

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
