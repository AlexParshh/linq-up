const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const mapsKey = process.env.GOOGLE_MAPS_API_KEY;

app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res, next) => {
    res.send('API Status: Running');
    
});

app.post('/geolocate', (req, res) => {


    const link = "https://maps.googleapis.com/maps/api/geocode/json?address="
    let address = req.body.address;

    let fullLink = link+address+"&key="+mapsKey;

    fetch(fullLink).then((result) => result.json()).then((result)=>{
        res.send(result["results"][0].geometry.location);
    })

  });

app.post('/nearbyplaces', (req,res) => {

    let params = req.body;

    const link = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+params.midPoint[0]+","+params.midPoint[1]+"&radius="+params.radius+"&keyword="+params.POI+"&name&rating"+"&key="+mapsKey;

    fetch(link).then((result)=>result.json()).then((result)=>{
        res.send(result);
    });


});

app.post('/traveltime', (req, res) => {

    let params = req.body;

    const link = "https://maps.googleapis.com/maps/api/directions/json?origin="+params.originLat+","+params.originLon+"&destination="+params.targetLat+","+params.targetLon+"&mode="+params.travelMode+"&key="+mapsKey;

    fetch(link).then((result)=>result.json()).then((result)=>{
        res.send(result)
    });

});

app.post('/sendemail', (req, res, next) => {
    sendGrid.setApiKey(process.env.SEND_GRID_API_KEY)
    const msg = {
        to: req.body.to,
        from: "linqup.reminder@gmail.com",
        subject: "Linq up reminder!",
        text: req.body.text
    }

    sendGrid.send(msg).then(result => {
        res.status(200).json({
            success:true
        });
    }).catch(err => {
        console.log(err);
        res.status(401).json({
            success:false
        });
    });

});

app.listen(4000, () => console.log("Running on Port 4000"));