

module.exports = {
    logLift: (req, res) => {
        const db = req.app.get('db');
        db.log_lift([
                    req.params.id, 
                    req.body.date, 
                    req.body.lift, 
                    req.body.reps, 
                    req.body.sets, 
                    req.body.weight, 
                    req.body.rpe
        ]).then(returning => res.status(200).send(returning))
    },

    logLifts: (req, res) => {
        const db = req.app.get('db');
        let liftArr = req.body.sets;

        for(let i=0; i<liftArr.length; i++){
            db.log_lift([
                req.params.id, 
                liftArr[i].date, 
                liftArr[i].workout,
                liftArr[i].reps, 
                liftArr[i].sets, 
                liftArr[i].weight, 
                liftArr[i].rpe
            ])
        }
       res.status(200).send(liftArr)
    },

    getAllLifts: (req, res) => {
        const db = req.app.get('db');
        console.log(req.params.id)
        db.get_all_lifts([req.params.id])
            .then(allLifts => res.status(200).send(allLifts))        
    },

    updateLift: (req, res) => {
        const db = req.app.get('db');
        db.update_lift([
            req.params.liftid, 
            req.body.date, 
            req.body.lift, 
            req.body.reps, 
            req.body.sets, 
            req.body.weight, 
            req.body.rpe
        ]).then(lift => res.status(200).send(lift))
    }
}