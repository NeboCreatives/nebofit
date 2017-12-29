

module.exports = {
    //Logs a single lift
    logLift: (req, res) => {
        const db = req.app.get('db');
        let lbsPerRPE = (req.body.weight * req.body.reps * req.body.sets) / req.body.rpe;
        db.log_lift([
                    req.params.id, 
                    req.body.date, 
                    req.body.lift, 
                    req.body.reps, 
                    req.body.sets, 
                    req.body.weight, 
                    req.body.rpe,
                    lbsPerRPE
        ]).then(returning => res.status(200).send(returning))
    },

    // Logs lifts from an array
    logLifts: (req, res) => {
        const db = req.app.get('db');
        let liftArr = req.body.sets;

        for(let i=0; i<liftArr.length; i++){
            let lbsPerRPE = (liftArr[i].weight * liftArr[i].reps * liftArr[i].sets) / liftArr[i].rpe;
            db.log_lift([
                req.params.id, 
                liftArr[i].date, 
                liftArr[i].workout, 
                liftArr[i].reps, 
                liftArr[i].sets, 
                liftArr[i].weight, 
                liftArr[i].rpe,
                lbsPerRPE
            ])
        }
       res.status(200).send(liftArr)
    },

    // Returns all lifts from that user
    getAllLifts: (req, res) => {
        const db = req.app.get('db');
        db.get_all_lifts([req.params.id])
            .then(allLifts => res.status(200).send(allLifts))        
    },

    // Updates a lift already in database
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