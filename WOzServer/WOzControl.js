// WOzControl.js
// Node/Express server to support the IVR Usability Test tool written for Twilio SIGNAL 2020
//
// Endpoints:
//
//  /getTwiML - invoked from the phone number to run the IVR
//
//  /setPrompt - sets the action and prompt text for the next request from the IVR
//
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const serverAddress='https://bbudd.ngrok.io'; 

const inboundParser = bodyParser.urlencoded({extended:false});

var promptText='';     // Blank prompt to play if TwiML requested before a prompt has been set
var nextAction='say';  // Set next action to 'say' as default to play this blank prompt


var cors = require('cors')
app.use(cors())
app.use(express.static("./webassets"));  // Initialise directory for static assets

var twimlDoc;

// Request from Twilio for TwiML
app.post('/getTwiML', inboundParser, (req, res) => {

    console.log(`getTwiML:`, req.body);
    console.log(`nextAction=${nextAction} promptText=${promptText}`);

    if (nextAction==='hangup') {              
        twimlDoc=`<?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <Hangup/>
        <Redirect>${serverAddress}/getTwiML</Redirect>
        
        </Response>`;
    } else {
        twimlDoc=`<?xml version="1.0" encoding="UTF-8"?>
        <Response>
            <Say voice='Polly.Amy-Neural'>${promptText}</Say>   
        <Redirect>${serverAddress}/getTwiML</Redirect>
        
        </Response>`;
        promptText='';
    }   
    res.status(200); 
    res.contentType('application/xml');
    res.header('Access-Control-Allow-Origin', '*');
    res.send(twimlDoc);

    // blank the nextAction so we know there's no update
    nextAction='';
})

// Setting of text from the driver, store in global
app.post('/setPrompt', inboundParser, (req, res) => {
    console.log('promptText=',promptText);
    console.log(`setPrompt:`, req.body.promptToSet);
    nextAction=req.body.action;
    promptText=req.body.promptToSet;
    console.log('promptText now=',promptText);

    res.status(204); 
    res.contentType('application/xml');
    res.header('Access-Control-Allow-Origin', '*');
    res.send('');


})

app.listen(port, () => console.log(`WOzControl listening on port ${port}!`))