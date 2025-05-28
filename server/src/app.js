const path= require("path");
const express = require('express'); // Added express module
const cors = require('cors'); // Added cors module
const planetsRouter = require('./routes/planets/planets.router.js')




const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..','public' )))


//importing the planets router
app.use(planetsRouter)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'))
})


module.exports = app; // Exporting the app module