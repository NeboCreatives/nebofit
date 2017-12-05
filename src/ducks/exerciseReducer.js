const initialState = {
  exercises: [ 
    'benchpress',
    'squats',
    'pull-ups',
    'sit-ups'
  ],
};

const GET_EXERCISES = 'GET_EXERCISES'

export const getExercises = (exercises) => {
  return {
    type: GET_EXERCISES,
    payload: exercises
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISES + '_FULLFILLED':
    return Object.assign({}, state, {exercises: action.payload})
    default:
      return state;
  }
}