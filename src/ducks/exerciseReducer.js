const initialState = {
  exercises: [ 
    'benchpress',
    'squats',
    'pull-ups',
    'sit-ups'
  ],
  inputs: [{
    workout: '',
    sets: 0,
    weight: 0,
    reps: 0,
    rpe: 0
  }],
  
};

const GET_EXERCISES = 'GET_EXERCISES'
const UPDATE_INPUTS = 'UPDATE_INPUTS'
const ADD_WORKOUT ='ADD_WORKOUT'

export const getExercises = (exercises) => {
  return {
    type: GET_EXERCISES,
    payload: exercises
  }
}

export const updateExercise = (inputs) => {
  return {
    type: UPDATE_INPUTS,
    payload: inputs
  }
}

export const addWorkout = (add) => {
  return {
    type: ADD_WORKOUT,
    payload: add 
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISES + '_FULLFILLED':
    return Object.assign({}, state, {exercises: action.payload})

    case UPDATE_INPUTS:
    return Object.assign({}, state, {inputs: action.payload})

    case ADD_WORKOUT:
    return Object.assign({}, state, {add: action.payload} )

    default:
      return state;
  }
}