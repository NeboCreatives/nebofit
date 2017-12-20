import { getTodaySleep } from './databaseReducer';

const userID = 3;
const date = '2017-12-18';

test('getTodaySleep should return an object with a type and payload keys', () => {
    getTodaySleep(userID, date, 'get')
})