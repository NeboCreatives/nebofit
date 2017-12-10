const initialState = {
  exercises: [
    'benchpress',
    'squats',
    'pull-ups',
    'sit-ups',
  ],
  inputs: [{
    workout: '',
    sets: 0,
    weight: 0,
    reps: 0,
    rpe: 0,
  }],
  sets: [],
};

const GET_EXERCISES = 'GET_EXERCISES';
const UPDATE_INPUTS = 'UPDATE_INPUTS';
const ADD_WORKOUT = 'ADD_WORKOUT';
const ADD_TO_SETS = 'ADD_TO_SETS';

export const getExercises = (exercises) => {
  return {
    type: GET_EXERCISES,
    payload: exercises,
  };
};

export const updateExercise = (inputs) => {
  return {
    type: UPDATE_INPUTS,
    payload: inputs,
  };
};

export const addWorkout = (add) => {
  return {
    type: ADD_WORKOUT,
    payload: add,
  };
};

export const addToSets = (inputs, workout) => {
  let temp = {...inputs, workout};
  console.log(temp);
  return {
    type: ADD_TO_SETS,
    payload: temp,
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISES + '_FULLFILLED':
      return Object.assign({}, state, {exercises: action.payload});

    case UPDATE_INPUTS:
      return Object.assign({}, state, {inputs: action.payload});

    case ADD_WORKOUT:
      return Object.assign({}, state, {add: action.payload});

    case ADD_TO_SETS:
      return Object.assign({}, state, {sets: [...state.sets, action.payload]});

    default:
      return state;
  }
}