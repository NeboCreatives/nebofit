const axios = require('axios');


module.exports = {
    getSleep: (req, res) => {
        const db = req.app.get('db');
        axios.get(`https://api.fitbit.com/1.2/user/-/sleep/date/${req.body.date}.json`, {headers: {Authorization: `Bearer ${req.body.accessToken}`}})
            .then( sleepData => {
                const { sleep, summary } = sleepData.data;
                db.log_sleep([
                    req.params.id,
                    summary.totalMinutesAsleep,
                    sleep[0].levels.summary.deep.minutes,
                    sleep[0].levels.summary.light.minutes,
                    sleep[0].levels.summary.rem.minutes,
                    sleep[0].levels.summary.wake.minutes,
                    sleep[0].efficiency
                ]).then((asdf)=> res.status(200).send(asdf))
                    .catch(err => console.log(err))
            })
            .catch(err => res.status(500).send(err))
    }
}

