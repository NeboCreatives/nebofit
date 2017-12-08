const http = require('http');
const path = require('path');
const express = require('express');
const axios = require('axios');
const massive = require('massive');
const session = require("express-session");
const process = require("process");
const bodyParser = require('body-parser');
const cors = require('cors')
const moment = require('moment');

const fCtrl = require('./controllers/fitbit_controller');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const CLIENT_ID = '22CFSG';
const CLIENT_SECRET = 'ffb7405c22f3c71b44ddf53c408f093d';
const SESSION_SECRET = 'ytrhcyftrtrsedthrdyu';
const CALLBACK_URL = 'http://localhost:8080/callback';


// initialize the Fitbit API client
const FitbitApiClient = require("fitbit-node");
const client = new FitbitApiClient(CLIENT_ID, CLIENT_SECRET);

// Use the session middleware

massive('postgres://ahqvwbzkaxiylb:2483305b5edb7da64f1e4dbc63dc98c91cc70c6998d3fbb9fbb78e98206a608e@ec2-54-163-249-237.compute-1.amazonaws.com:5432/d8dl2c3o4vsdt?ssl=true').then( (db) => {
    console.log('Connected to Heroku')
    app.set('db', db);
})


app.use(session({
     secret: SESSION_SECRET, 
     cookie: { maxAge: 60000 },
     resave: false,
     saveUninitialized: true
    }));

// redirect the user to the Fitbit authorization page
app.get("/authorize", function (req, res) {
    // request access to the user's activity, heartrate, location, nutrion, profile, settings, sleep, social, and weight scopes
    res.redirect(client.getAuthorizeUrl('activity heartrate location nutrition profile settings sleep social weight',CALLBACK_URL));
});

// handle the callback from the Fitbit authorization flow
app.get("/callback", function (req, res) {
    // exchange the authorization code we just received for an access token
    client.getAccessToken(req.query.code, CALLBACK_URL).then(function (result) {
        axios.get('https://api.fitbit.com/1/user/-/profile.json', {headers: {Authorization: `Bearer ${result.access_token}`}})
            .then( profileData => {
                const db = app.get('db');
                db.find_user([profileData.data.user.encodedId])
                    .then(user => {
                        if(!user[0]){
                            console.log('no user found')
                            db.create_user([
                                profileData.data.user.firstName,
                                profileData.data.user.lastName,
                                profileData.data.user.avatar640,
                                profileData.data.user.encodedId,
                                profileData.data.user.height,                                
                                profileData.data.user.weight,                                
                                profileData.data.user.dateOfBirth,                                
                                profileData.data.user.gender,                                
                                profileData.data.user.timezone,
                                result.access_token,
                                profileData.data.user.weight,
                                moment().format('YYYY-MM-DD')
                            ]).then(returnedData => {
                                fCtrl.firstLoginDataRequest;
                                req.session.userData = returnedData;
                                req.session.authorized = true;
                                req.session.access_token = result.access_token;
                                req.session.save();
                                res.redirect("http://localhost:3000/UserLanding");
                            })
                            .catch(err => console.log(err))
                        } else {
                            db.update_access_token([result.access_token, user[0].auth_id])
                                .then(returnedData => {
                                    req.session.userData = returnedData;
                                    req.session.authorized = true;
                                    req.session.access_token = result.access_token;
                                    req.session.save();
                                    res.redirect("http://localhost:3000/UserLanding");
                                })
                        }
                    })
            })
            .catch(error => console.log('error: ', error))
        // use the access token to fetch the user's profile information
        
    }).catch(err => res.status(400).send(err))
});

app.get("/logout", function(req, res) {
    req.session.authorized = false;
    req.session.access_token = null;
    req.session.save();
    res.redirect("/");  
})


//endpoints
app.get(`/api/auth/me`, fCtrl.authMe)
app.post(`/api/data/:id`, fCtrl.firstLoginDataRequest)
app.get(`/api/data/getTodaySleep/:id/:date/:rest`, fCtrl.getTodaySleep)
app.get(`/api/data/getTodayActivity/:id/:date/:rest`, fCtrl.getTodayActivity)
app.get(`/api/data/getTodayWeight/:id/:date/:rest`, fCtrl.getTodayWeight)
app.get(`/api/data/getTodayNutrition/:id/:date/:rest`, fCtrl.getTodayNutrition)
app.post(`/api/data/getSinceLastLogin/:id/:date/:rest`, fCtrl.getSinceLastLogin)
app.post(`/api/data/updateLastLogin/:id/:date`, fCtrl.updateLastLogin)


// launch the server
const PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));