import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './ducks/exerciseReducer'
import databaseReducer from './ducks/databaseReducer'



const reducers = combineReducers({
  reducer, 
  databaseReducer
});

export default createStore(reducers, applyMiddleware(promiseMiddleware()));