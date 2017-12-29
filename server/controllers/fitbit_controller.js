const axios = require('axios');
const moment = require('moment');

let userData = {};

// Function to find the activity total and return distance
function getDistance(distances){
    for(let j=0; j<distances.length; j++){
        if(distances[j].activity === 'total')
            return distances[j].distance;
    }
}

// Function to get sleep data for date sent in. Only res.send when getting a single day
function getSleep(req, res, todayDate, rest){
    const db = req.app.get('db');
    axios.get(`https://api.fitbit.com/1.2/user/-/sleep/date/${todayDate}.json`, {headers: {Authorization: `Bearer ${req.session.access_token}`}})
        .then( fitbitSleepData => {
            db.get_today_sleep([req.params.id, todayDate])
                .then(dbSleepData => {
                    if(dbSleepData.length === 0){
                        db.log_sleep([
                            req.params.id, 
                            fitbitSleepData.data.summary.totalMinutesAsleep, 
                            fitbitSleepData.data.sleep[0].efficiency, 
                            todayDate
                        ]).then(returning => rest === 'get' ? res.status(200).send(returning) : null)
                        .catch(err => res.status(400).send(err))
                    } else {
                        db.update_today_sleep([
                            fitbitSleepData.data.summary.totalMinutesAsleep, 
                            fitbitSleepData.data.sleep[0].efficiency, 
                            req.params.id, 
                            todayDate
                        ]).then(returning =>  rest === 'get' ? res.status(200).send(returning) : null)
                        .catch(err => res.status(400).send(err))   
                    }
                })
                .catch(err => res.status(400).send(err))
        })
        .catch(err => res.status(400).send(err))
}

// Function to get weight data for date sent in. Only res.send when getting a single day
function getWeight(req, res, todayDate, rest){
    const db = req.app.get('db');
    let oneMonth = moment(todayDate).subtract(1, 'month').format("YYYY-MM-DD")
    axios.get(`https://api.fitbit.com/1/user/-/body/log/weight/date/${oneMonth}/${todayDate}.json`, {headers: {Authorization: `Bearer ${req.session.access_token}`}})
        .then( fitbitWeightData => {
            db.get_today_weight([req.params.id, todayDate])
                .then(dbWeightData => {
                    let recentWeight = fitbitWeightData.data.weight[fitbitWeightData.data.weight.length-1];
                    if(dbWeightData.length === 0){
                        db.log_weight([
                            req.params.id, 
                            recentWeight.weight,
                            todayDate
                        ]).then(returning =>  rest === 'get' ? res.status(200).send(returning) : null)
                    } else {
                        db.update_today_weight([
                            req.params.id, 
                            recentWeight.weight,
                            todayDate
                        ]).then(returning =>  rest === 'get' ? res.status(200).send(returning) : null)
                    }
                })
        })
        .catch(err => res.status(400).send(err))
}

// Function to get activity data for date sent in. Only res.send when getting a single day
function getActivity(req, res, todayDate, rest) {
    const db = req.app.get('db');
    axios.get(`https://api.fitbit.com/1/user/-/activities/date/${todayDate}.json`, {headers: {Authorization: `Bearer ${req.session.access_token}`}})
        .then( fitbitActivityData => {
            let distance = getDistance(fitbitActivityData.data.summary.distances)                
            db.get_today_activity([req.params.id, todayDate])
                .then(dbActivityData => {
                    if(dbActivityData.length === 0){
                        db.log_activity([
                            req.params.id, 
                            todayDate, 
                            fitbitActivityData.data.summary.caloriesOut, 
                            fitbitActivityData.data.summary.steps, 
                            distance
                        ]).then(returning =>  rest === 'get' ? res.status(200).send(returning) : null)
                    } else {
                        db.update_today_activity([
                            req.params.id, 
                            todayDate, 
                            fitbitActivityData.data.summary.caloriesOut, 
                            fitbitActivityData.data.summary.steps, 
                            distance]).then(returning =>  rest === 'get' ? res.status(200).send(returning) : null)
                    }
                })
        })
        .catch(err => res.status(400).send(err))
}

// Function to get nutrition data for date sent in. Only res.send when getting a single day
function getNutrition(req, res, todayDate, rest) {
    const db = req.app.get('db');
    axios.get(`https://api.fitbit.com/1/user/-/foods/log/date/${todayDate}.json`, {headers: {Authorization: `Bearer ${req.session.access_token}`}})
        .then( fitbitNutritionData => {
            db.get_today_nutrition([req.params.id, todayDate])
                .then(dbNutritionData => {
                    const { summary } = fitbitNutritionData.data;                    
                    if(dbNutritionData.length === 0){
                        db.log_nutrition([
                            req.params.id,
                            todayDate,
                            summary.calories,
                            summary.carbs,
                            summary.fat,
                            summary.protein,
                            summary.water
                        ]).then(returning =>  rest === 'get' ? res.status(200).send(returning) : null)
                    } else {
                        db.update_today_nutrition([
                            req.params.id,
                            todayDate,
                            summary.calories,
                            summary.carbs,
                            summary.fat,
                            summary.protein,
                            summary.water
                        ]).then(returning =>  rest === 'get' ? res.status(200).send(returning) : null)
                    }
                })
        })
        .catch(err => res.status(400).send(err))
}

module.exports = {
    authMe: (req, res) => {
        if(req.session) {
            return res.status(200).send(req.session)
        } else {
            return res.status(200).send(false)            
        }
    },

    getTodaySleep: (req, res) => {
        getSleep(req, res, req.params.date, req.params.rest);
    },

    getTodayActivity: (req, res) => {
        getActivity(req, res, req.params.date, req.params.rest);
    },

    getTodayWeight: (req, res) => {
        getWeight(req, res, req.params.date, req.params.rest);
    },

    //Getting calories eaten and water
    getTodayNutrition: (req, res) => {
        getNutrition(req, res, req.params.date, req.params.rest);
    },

    // Finds the date of the last login and loops through get functions until current day reached
    getSinceLastLogin: (req, res) => {
        let todayDate = moment().format('YYYY-MM-DD');
        let lastLoginDate = req.params.date;
        let workingDate = lastLoginDate;
        if(todayDate !== lastLoginDate){
            do{
                getSleep(req, res, workingDate, req.params.rest);
                getActivity(req, res, workingDate, req.params.rest);
                getWeight(req, res, workingDate, req.params.rest);
                getNutrition(req, res, workingDate, req.params.rest);
                workingDate = moment(workingDate).add(1, 'days').format('YYYY-MM-DD');
            }while(workingDate !== todayDate);
        }
        res.status(200).send('success');
    },

    // Updates the last login date to current day
    updateLastLogin: (req, res) => {
        const db = req.app.get('db');
        db.update_last_login([req.params.id, req.params.date])
            .then(returning => res.status(200).send(returning))
    },

    // res.send all data for that user
    getAllData: (req, res) => {
        const db = req.app.get('db');
        db.get_all_activity([req.params.id])
            .then(activityData => {
                db.get_all_nutrition([req.params.id])
                    .then(nutritionData => {
                        db.get_all_sleep([req.params.id])
                            .then(sleepData => {
                                db.get_all_weight([req.params.id])
                                    .then(weightData => {
                                        let allData = {activityData, nutritionData, sleepData, weightData}
                                        res.status(200).send(allData);
                                    })
                            })
                    })
            })
    },

    //Updates the goals for that user
    updateGoals: (req, res) => {
        const db = req.app.get('db');
        db.update_goals([
            req.params.id,
            req.body.goal_weight, 
            req.body.goal_sleep,
            req.body.goal_steps,
            req.body.goal_hydration,
            req.body.goal_calories
        ]).then(returning => res.status(200).send(returning))
    }
}

