import {combineReducers} from 'redux';
import client from './routes/Client/reducers/client';
import { clientForms } from './routes/Client/reducers/forms';
import admin from './routes/Admin/reducers/admin';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
	client,
	admin,
	clientForms,
	'routing': routerReducer
});

export default rootReducer;
