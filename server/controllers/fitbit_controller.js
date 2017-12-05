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

module.exports = {
    getData: (req, res) => {
        //getSleep(req, res);
        getWeight(req, res);
    }
}

