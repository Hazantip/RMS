import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import client from './routes/Client/reducers/client';
import admin from './routes/Admin/reducers/admin';

const rootReducer = combineReducers({
	client,
	admin,
	'routing': routerReducer,
});

export default rootReducer;
