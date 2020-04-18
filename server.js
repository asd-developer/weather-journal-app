// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const fetch = require("node-fetch");

// Start up an instance of app
const app = express();

/* Middleware*/
var bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;
const apiKey = '57dab2d04f62a1543169c35a20f27a8d';
 
// Setup Server
app.get('/all', getWeatherForPostCode);

function getWeatherForPostCode (req, res) {

    let countryCode = 'us';
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?zip=${req.query.zipCode},${countryCode}&appid=${apiKey}&units=metric`;

    const retrieveData = async (endpoint) =>{ 
        const request = await fetch(endpoint);

        try {
            // Transform into JSON
            const response = await request.json();
            res.status(200).send(response);
        }
        catch(error) {
            console.log("error", error);
            // appropriately handle the error
        }       
    };        
        retrieveData(endpoint);
};

  
app.get('/checkzipcode', checkZipCode);
function checkZipCode (req, res) {

    let endpoint = `https://api.bring.com/pickuppoint/api/postalCode/us/getCityAndType/${req.query.zipCode}.json`;
        
    const retrieveData = async (endpoint) =>{ 
        const request = await fetch(endpoint);
        const allData = await request.json();

        if(request.status !== 200){
            res.status(400).send(allData);
        }
        else{
            res.status(200).send(allData);
        }
    };  
        retrieveData(endpoint);
};


const server = app.listen(port,listening);

function listening(){
    console.log('Server running');
    console.log(`Running on localhost:${port}`);
};

//POST route

// const data = [];

// app.post('/weather', getWeather)

// function getWeather( req, res){
//     newEntry = {
//         temperature: req.body.temp
//         date: req.body.date
//         userResponse: req.body.userRes 
//     }
//     projectData.push(newEntry);
//     console.log(projectData);
// }