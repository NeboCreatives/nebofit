import axios from 'axios';

const initialState = {
    userData: {

    },
    todayData: {
        todaySleep: {total_minutes: 0},
        todayActivity: {steps: 0},
        todayNutrition: {calories: 0},
        todayWeight: {weight: 0}
    },
    userLandingFlag: false,
    allData: {
        sleepData: [{total_minutes: 0}],
        activityData: [{steps: 0}],
        nutritionData: [{calories: 0, water: 0}],
        weightData: [{weight: 0}]
    }
}

const GET_TODAY_SLEEP = 'GET_TODAY_SLEEP';
const GET_TODAY_ACTIVITY = 'GET_TODAY_ACTIVITY';
const GET_TODAY_NUTRITION = 'GET_TODAY_NUTRITION';
const GET_TODAY_WEIGHT = 'GET_TODAY_WEIGHT';
const SAVE_USER_DATA = 'SAVE_USER_DATA';
const UPDATE_USER_LANDING_FLAG = 'UPDATE_USER_LANDING_FLAG';
const GET_ALL_DATA = 'GET_ALL_DATA';


export const getTodaySleep = (userID, date, rest) => {
    const data = axios.get(`/api/data/getTodaySleep/${userID}/${date}/${rest}`)
        .then(result => result.data)
    return {
        type: GET_TODAY_SLEEP,
        payload: data
    }
}

export const getTodayActivity = (userID, date, rest) => {
    const data = axios.get(`/api/data/getTodayActivity/${userID}/${date}/${rest}`)
        .then(result => result.data)
    return {
        type: GET_TODAY_ACTIVITY,
        payload: data
    }
}

export const getTodayNutrition = (userID, date, rest) => {
    const data = axios.get(`/api/data/getTodayNutrition/${userID}/${date}/${rest}`)
        .then(result => result.data)
    return {
        type: GET_TODAY_NUTRITION,
        payload: data
    }
}

export const getTodayWeight = (userID, date, rest) => {
    const data = axios.get(`/api/data/getTodayWeight/${userID}/${date}/${rest}`)
        .then(result => result.data)
    return {
        type: GET_TODAY_WEIGHT,
        payload: data
    }
}

export const saveUserData = (userData) => {
    return {
        type: SAVE_USER_DATA,
        payload: userData
    }
}

export const updateUserLandingFlag = () => {
    return {
        type: UPDATE_USER_LANDING_FLAG,
        payload: true
    }
}

export const getAllData = (userID) => {
    const allData = axios.get(`/api/data/getAllData/${userID}`)
        .then(result => result.data)
    return {
        type: GET_ALL_DATA,
        payload: allData
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
        case SAVE_USER_DATA:
            return Object.assign({}, state, {userData: action.payload})
        case UPDATE_USER_LANDING_FLAG:
            return Object.assign({}, state, {userLandingFlag: action.payload})
        case GET_ALL_DATA + '_FULFILLED':
            return Object.assign({}, state, {allData: action.payload})
        default:
            return state;
    }
}