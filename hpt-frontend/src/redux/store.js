import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import tarifficationReducer from './tarifficationReducer';

const reducers = combineReducers({
    tariffication: tarifficationReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
