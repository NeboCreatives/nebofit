const moment = require('moment');

module.exports = {
    sortArray: (newExercises) => {
        newExercises.sort((a, b) => {
          if(a.text < b.text) return -1;
          if(a.text > b.text) return 1;
          return 0;
        })
        return newExercises;
    },

    mapLifts: (allLifts) => {
        let reduced = Math.round((allLifts.reduce((total, num) => total + num)/allLifts.length)*100)/100;
        return reduced
    },

    mapDays: (activityData) => {
        let mapDays = activityData.map(walk => {
            return moment(walk.date).format('dddd');
          });
        return mapDays;
    },

    differenceTern: (stepsDifference) => {
        if(stepsDifference > 0){
            return `${stepsDifference.toLocaleString()} steps to go`
        } else {
        return `${Math.abs(stepsDifference).toLocaleString()} steps over your goal`
        }
    },

    mapSteps: (activityData) => {
        let mapSteps = activityData.map(walk => {
            return walk.steps;
          });
        return mapSteps;
    },

    profileGoalsSubmit: (userID, goals) => {
        return {
            put: `/api/data/updateGoals/${userID}`,
            goals
        }
    },

    handleAddWorkout: (value) => {
        return value.toUpperCase();
    },

    getAllLifts: (exercises) => {
        let shortArr = ['BENCH PRESS', 'SQUAT', 'DEADLIFT'];
        for(let i=0; i<exercises.length; i++){
          if(!shortArr.includes(exercises[i])){
            shortArr.push(exercises[i])
          }
        }
        return shortArr;
    },

    subtractDate: (date) => {
        return moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    },

    updateInputs: (inputs) => {
        return {
            type: 'UPDATE_INPUTS',
            payload: inputs
        }
    },

    addWorkout: (workout) => {
        let newWorkout = {text: workout, value: workout}
        return {
          type: 'ADD_WORKOUT',
          payload: newWorkout,
        }
    },

    addToSets: (inputs, workout) => {
        let temp = [...inputs, workout];
        return {
          type: 'ADD_TO_SETS',
          payload: temp
        }
    },

    getTodaySleep: (userID, date, rest) => {
        return `/api/data/getTodaySleep/${userID}/${date}/${rest}`;
    },

    getTodayActivity: (userID, date, rest) => {
        return `/api/data/getTodayActivity/${userID}/${date}/${rest}`;
    },

    getTodayNutrition: (userID, date, rest) => {
        return `/api/data/getTodayNutrition/${userID}/${date}/${rest}`;
    },

    getTodayWeight: (userID, date, rest) => {
        return `/api/data/getTodayWeight/${userID}/${date}/${rest}`;
    },

    getAllData: (userID) => {
        return `/api/data/getAllData/${userID}`;
    },

    getAllLiftsFitbit: (userID) => {
        return `/api/data/getAllLifts/${userID}`;
    },

    logLift: (body) => {
        return (body.weight * body.reps * body.sets) / body.rpe;
    },

    logLifts: (sets) => {
        let rpeSets = [];
        for(let i=0; i<sets.length; i++){
            rpeSets.push((sets[i].weight * sets[i].reps * sets[i].sets) / sets[i].rpe)
        }
        return rpeSets;
    }
}