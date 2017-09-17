import {combineReducers} from 'redux';
import client from './client';
import admin from './admin';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
	client,
	admin,
	'routing': routerReducer
});

export default rootReducer;
