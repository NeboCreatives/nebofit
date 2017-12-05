const axios = require('axios');
const moment = require('moment');

let userData = {};

//Gets the sleep data from the last 100 days
function getSleep(req, res){
    const db = req.app.get('db');
    axios.get(`https://api.fitbit.com/1.2/user/-/sleep/list.json?offset=0&limit=100&sort=desc&beforeDate=${req.body.date}`, {headers: {Authorization: `Bearer ${req.body.accessToken}`}})
        .then( sleepData => {
            const { sleep } = sleepData.data;
            for(let i=0; i<sleep.length; i++){
                db.log_sleep([
                    req.params.id,
                    sleep[i].minutesAsleep,
                    sleep[i].levels.summary.deep.minutes,
                    sleep[i].levels.summary.light.minutes,
                    sleep[i].levels.summary.rem.minutes,
                    sleep[i].levels.summary.wake.minutes,
                    sleep[i].efficiency,
                    sleep[i].dateOfSleep
                ])
            }
        })
}

//Gets the weight logs for the last 100 days
function getWeight(req, res){
    let oneMonth = moment(req.body.date).subtract(1, 'month').format("YYYY-MM-DD")
    let twoMonths = moment(req.body.date).subtract(2, 'month').format("YYYY-MM-DD")
    let threeMonths = moment(req.body.date).subtract(3, 'month').format("YYYY-MM-DD")
    const db = req.app.get('db');
    
    axios.get(`https://api.fitbit.com/1/user/-/body/log/weight/date/${oneMonth}/${req.body.date}.json`, {headers: {Authorization: `Bearer ${req.body.accessToken}`}})
        .then( weightData => {
            const { weight } = weightData.data;
            for(let i=0; i<weight.length; i++){
                db.log_weight([
                    req.params.id,
                    weight[i].weight,
                    weight[i].fat,
                    weight[i].date
                ])
            }
        })
    
    axios.get(`https://api.fitbit.com/1/user/-/body/log/weight/date/${twoMonths}/${oneMonth}.json`, {headers: {Authorization: `Bearer ${req.body.accessToken}`}})
        .then( weightData => {
            const { weight } = weightData.data;
            for(let i=0; i<weight.length; i++){
                db.log_weight([
                    req.params.id,
                    weight[i].weight,
                    weight[i].fat,
                    weight[i].date
                ])
            }
        })
    
    axios.get(`https://api.fitbit.com/1/user/-/body/log/weight/date/${threeMonths}/${twoMonths}.json`, {headers: {Authorization: `Bearer ${req.body.accessToken}`}})
        .then( weightData => {
            const { weight } = weightData.data;
            for(let i=0; i<weight.length; i++){
                db.log_weight([
                    req.params.id,
                    weight[i].weight,
                    weight[i].fat,
                    weight[i].date
                ])
            }
        })
}

function getActivities(req, res) {
    const db = req.app.get('db');
    for(let i=0; i<100; i++){
        let date = moment(req.body.date).subtract(i, 'day').format("YYYY-MM-DD")
        axios.get(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {headers: {Authorization: `Bearer ${req.body.accessToken}`}})
            .then( activityData => {
                const { summary } = activityData.data;
                let distance = getDistance(summary.distances)
                db.log_activity([
                    req.params.id,
                    date,
                    summary.caloriesOut,
                    summary.steps,
                    distance
                ])
            })
    }
}

function getDistance(distances){
    for(let j=0; j<distances.length; j++){
        if(distances[j].activity === 'total')
            return distances[j].distance;
    }
}

function getNutrition(req, res) {
    const db = req.app.get('db');
    for(let i=0; i<100; i++){
        let date = moment(req.body.date).subtract(i, 'day').format("YYYY-MM-DD")
        axios.get(`https://api.fitbit.com/1/user/-/foods/log/date/${date}.json`, {headers: {Authorization: `Bearer ${req.body.accessToken}`}})
            .then( nutritionData => {
                const { summary } = nutritionData.data;
                db.log_nutrition([
                    req.params.id,
                    date,
                    summary.calories,
                    summary.carbs,
                    summary.fat,
                    summary.protein,
                    summary.water
                ])
            })
    }
}

module.exports = {
    getData: (req, res) => {
        //getSleep(req, res);
        //getWeight(req, res);
        //getActivities(req, res);
        getNutrition(req, res)
    }
}

