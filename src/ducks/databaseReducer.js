import axios from 'axios';

const initialState = {
    todayData: {
        todaySleep: {total_minutes: 0},
        todayActivity: {steps: 0},
        todayNutrition: {steps: 0},
        todayWeight: {weight: 0}
    }
}

const GET_TODAY_SLEEP = 'GET_TODAY_SLEEP';
const GET_TODAY_ACTIVITY = 'GET_TODAY_ACTIVITY';
const GET_TODAY_NUTRITION = 'GET_TODAY_NUTRITION';
const GET_TODAY_WEIGHT = 'GET_TODAY_WEIGHT';

export const getTodaySleep = (userID, date) => {
    const data = axios.get(`/api/data/getTodaySleep/${userID}/${date}`)
        .then(result => result.data)
    return {
        type: GET_TODAY_SLEEP,
        payload: data
    }
}

export const getTodayActivity = (userID, date) => {
    const data = axios.get(`/api/data/getTodayActivity/${userID}/${date}`)
        .then(result => result.data)
    return {
        type: GET_TODAY_ACTIVITY,
        payload: data
    }
}

export const getTodayNutrition = (userID, date) => {
    const data = axios.get(`/api/data/getTodayNutrition/${userID}/${date}`)
        .then(result => result.data)
    return {
        type: GET_TODAY_NUTRITION,
        payload: data
    }
}

export const getTodayWeight = (userID, date) => {
    const data = axios.get(`/api/data/getTodayWeight/${userID}`)
        .then(result => result.data)
    return {
        type: GET_TODAY_WEIGHT,
        payload: data
    }
}


export default function databaseReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TODAY_SLEEP + '_FULFILLED':
            return Object.assign({}, state, {todayData: Object.assign({}, state.todayData, {todaySleep: action.payload[0]})})
        case GET_TODAY_ACTIVITY + '_FULFILLED':
            return Object.assign({}, state, {todayData: Object.assign({}, state.todayData, {todayActivity: action.payload[0]})})
        case GET_TODAY_NUTRITION + '_FULFILLED':
            return Object.assign({}, state, {todayData: Object.assign({}, state.todayData, {todayNutrition: action.payload[0]})})
        case GET_TODAY_WEIGHT + '_FULFILLED':
            return Object.assign({}, state, {todayData: Object.assign({}, state.todayData, {todayWeight: action.payload[0]})})
        default:
            return state;
    }
}