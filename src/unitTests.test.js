const functions = require('./unitTests');
const moment = require('moment');


test('Tests if sortArray sorts by lift name from A-Z', () => {
    let arr = [{text: 'BENCH PRESS', value: 'BENCH PRESS'}, {text: 'SQUAT', value: 'SQUAT'}, {text: 'DEADLIFT', value: 'DEADLIFT'}];
    let sortedArr = functions.sortArray(arr)
    expect(sortedArr).toEqual([{text: 'BENCH PRESS', value: 'BENCH PRESS'}, {text: 'DEADLIFT', value: 'DEADLIFT'}, {text: 'SQUAT', value: 'SQUAT'}]);
})

test('Test if mapLifts correctly returns rpe for the last 7 days', () => {
    let result = functions.mapLifts([100, 200, 300, 400])
    expect(result).toEqual(250)
})

test('Tests if mapDays correctly adds the days to an arry', () => {
    let activityData = [{date: '2017-12-21'}, {date: '2017-12-20'}]
    let daysArr = functions.mapDays(activityData)
    expect(daysArr).toEqual(['Thursday', 'Wednesday'])
})

test('Tests if differenceTern correctly returns a string with the steps difference', () => {
    let result = functions.differenceTern(1500)
    expect(result).toEqual('1,500 steps to go')
})

test('Tests if mapSteps returns an array with steps', () => {
    let result = functions.mapSteps([{steps: 10000}, {steps: 16000}])
    expect(result).toEqual([10000, 16000])
})

test('Tests if profileGoalsSubmit action builder returns correctly', () => {
    let result = functions.profileGoalsSubmit(3, 'goals')
    expect(result).toEqual({put: `/api/data/updateGoals/3`, goals: 'goals'})
})

test('Tests if handleAddWorkout returns param as uppercase', () => {
    let result = functions.handleAddWorkout('bench press')
    expect(result).toEqual('BENCH PRESS')
})

test('Tests if getAllLifts can add to array with no duplicates', () => {
    let result = functions.getAllLifts(['SQUAT', 'DIP', 'MILITARY PRESS', 'DIP'])
    expect(result).toEqual(['BENCH PRESS', 'SQUAT', 'DEADLIFT', 'DIP', 'MILITARY PRESS'])
})

test('Tests if subtractDate returns the day before', () => {
    let result = functions.subtractDate('2017-12-21')
    expect(result).toEqual('2017-12-20')
})

test('Tests if updateInputs returns a correct action builder', () => {
    let result = functions.updateInputs('inputs')
    expect(result).toEqual({type: 'UPDATE_INPUTS', payload: 'inputs'})
})

test('Tests if addWorkout returns a correct action builder', () => {
    let result = functions.addWorkout('SQUAT')
    expect(result).toEqual({type: 'ADD_WORKOUT', payload: {text: 'SQUAT', value: 'SQUAT'}})
})

test('Tests if addToSets returns a correct action builder', () => {
    let result = functions.addToSets(['BENCH PRESS', 'SQUAT'], 'DEADLIFT')
    expect(result).toEqual({type: 'ADD_TO_SETS', payload: ['BENCH PRESS', 'SQUAT', 'DEADLIFT']})
})

describe('Get Today reducers', () => {
    test('Tests if getTodaySleep builds the axios string correctly', () => {
        let result = functions.getTodaySleep(3, '2017-12-21', 'get')
        expect(result).toEqual('/api/data/getTodaySleep/3/2017-12-21/get')
    })
    
    test('Tests if getTodayActivity builds the axios string correctly', () => {
        let result = functions.getTodayActivity(3, '2017-12-21', 'get')
        expect(result).toEqual('/api/data/getTodayActivity/3/2017-12-21/get')
    })
    test('Tests if getTodayNutrition builds the axios string correctly', () => {
        let result = functions.getTodayNutrition(3, '2017-12-21', 'get')
        expect(result).toEqual('/api/data/getTodayNutrition/3/2017-12-21/get')
    })
    test('Tests if getTodayWeight builds the axios string correctly', () => {
        let result = functions.getTodayWeight(3, '2017-12-21', 'get')
        expect(result).toEqual('/api/data/getTodayWeight/3/2017-12-21/get')
    })
})

test('Tests if getAllData builds the axios string correctly', () => {
    let result = functions.getAllData(3)
    expect(result).toEqual('/api/data/getAllData/3')
})

test('Tests if getAllLiftsFitbit builds the axios string correctly', () => {
    let result = functions.getAllLiftsFitbit(3)
    expect(result).toEqual('/api/data/getAllLifts/3')
})

test('Tests if logLift returns lbs per rpe correctly', () => {
    let result = functions.logLift({weight: 100, reps: 10, sets: 1, rpe: 10})
    expect(result).toEqual(100)
})

test('Tests if logLift returns lbs per rpe correctly for multiple lifts', () => {
    let result = functions.logLifts([{weight: 100, reps: 10, sets: 1, rpe: 10}, {weight: 100, reps: 10, sets: 1, rpe: 5}])
    expect(result).toEqual([100, 200])
})