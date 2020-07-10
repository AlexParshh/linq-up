const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res, next) => {
    res.send('API Status: I\'m awesome');
});

app.post('/send-email', (req, res, next) => {
    sendGrid.setApiKey("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")
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