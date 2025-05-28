const http = require('http');
const app = require('./app');

const {loadPlanetsData} = require("./models/planet.model.js")

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

async function startServer(){
    await loadPlanetsData();

    server.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })
}

startServer();

//....