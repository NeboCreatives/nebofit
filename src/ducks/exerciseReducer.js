import axios from 'axios';
import moment from 'moment';

const initialState = {
  exercises: [{text: 'BENCH PRESS', value: 'BENCH PRESS'}, {text: 'SQUAT', value: 'SQUAT'}, {text: 'DEADLIFT', value: 'DEADLIFT'}],
  inputs: [{
    workout: '',
    sets: 0,
    weight: 0,
    reps: 0,
    rpe: 0,
  }],
  sets: [],
  allLifts: [],
  weekLifts: []
};

const UPDATE_INPUTS = 'UPDATE_INPUTS';
const ADD_WORKOUT = 'ADD_WORKOUT';
const ADD_TO_SETS = 'ADD_TO_SETS';
const GET_ALL_LIFTS = 'GET_ALL_LIFTS';
const UPDATE_SETS = 'UPDATE_SETS';

function sortArray(newExercises){
  newExercises.sort((a, b) => {
    if(a.text < b.text) return -1;
    if(a.text > b.text) return 1;
    return 0;
  })
  return newExercises;
}

function mapLifts(allLifts){
  let mappedWeekLifts = [];
  let mappedDayLifts = [];
  let reduced = 0;
  let date = moment().format('YYYY-MM-DD');

  for(let i=0; i<7; i++){
    allLifts.map(lift => {
      if(lift.date === date){
        mappedDayLifts.push(lift.lbs_per_rpe)
        return lift.lbs_per_rpe
      }
    })
    let length = mappedDayLifts.length;
    if(mappedDayLifts.length !== 0){
      reduced = Math.round((mappedDayLifts.reduce((total, num) => total + num)/length)*100)/100;
      mappedWeekLifts.push(reduced)   
    } else {
      mappedWeekLifts.push(0);
    }
    reduced = 0;
    mappedDayLifts = [];
    date = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  }
  return mappedWeekLifts.reverse();
}

export const updateInputs = (inputs) => {
  return {
    type: UPDATE_INPUTS,
    payload: inputs,
  };
};

export const addWorkout = (workout) => {
  let newWorkout = {text: workout, value: workout}
  return {
    type: ADD_WORKOUT,
    payload: newWorkout,
  };
};

export const addToSets = (inputs, workout) => {
  let temp = {...inputs, workout};
  return {
    type: ADD_TO_SETS,
    payload: temp,
  };
};

export const getAllLifts = (userID) => {
  const data = axios.get(`/api/data/getAllLifts/${userID}`)
    .then(result => result.data)
  return {
    type: GET_ALL_LIFTS,
    payload: data,
  }
}

export const updateSets = (index, newSets) => {
  return {
    type: UPDATE_SETS,
    payload: newSets,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INPUTS:
      return Object.assign({}, state, {inputs: action.payload});

    case ADD_WORKOUT:
      let newWorkout = [...state.exercises, action.payload];
      newWorkout = sortArray(newWorkout);
      return Object.assign({}, state, {exercises: newWorkout});

    case ADD_TO_SETS:
      return Object.assign({}, state, {sets: [...state.sets, action.payload]});

    case GET_ALL_LIFTS + '_FULFILLED':
      let shortArr = ['BENCH PRESS', 'SQUAT', 'DEADLIFT'];
      let newExercises = state.exercises;
      for(let i=0; i<action.payload.length; i++){
        if(!shortArr.includes(action.payload[i].lift)){
          newExercises.push({text: action.payload[i].lift.toUpperCase(), value: action.payload[i].lift.toUpperCase()})
          shortArr.push(action.payload[i].lift)
        }
      }
      newExercises = sortArray(newExercises)
      let thisWeekLifts = mapLifts(action.payload);
      return Object.assign({}, state, {allLifts: action.payload, exercises: newExercises, weekLifts: thisWeekLifts});

    case UPDATE_SETS:
      return Object.assign({}, state, {sets: action.payload})

    default:
      return state;
  }
}