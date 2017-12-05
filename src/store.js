import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './ducks/reducer'

const reducers = combineReducers({
  reducer,
});

export default createStore(reducers, applyMiddleware(promiseMiddleware()));