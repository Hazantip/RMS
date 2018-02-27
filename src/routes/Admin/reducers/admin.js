import { assign } from 'lodash';
import { TEST_ACTION_CONST } from '../../Client/constants/actionTypes';
//import func from '../utils/somFunc';

const initialState = {
	'level1': {
		'name': 'level 1',
		'level2': {
			'name': 'level 2',
		},
	},
	'name': 'admin data',
};

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function adminReducer(state = initialState, action) {
	let newState;

	switch (action.type) {
		case TEST_ACTION_CONST:
			// For this example, just simulating a save by changing date modified.
			// In a real app using Redux, you might use redux-thunk and handle the async call in fuelSavingsActions.js
			return assign({}, state, { 'dateModified': action.dateModified });

		case 2:
			newState = assign({}, state);

			// Do something...
			//newState[action.fieldName] = action.value;
			//newState.necessaryDataIsProvidedToCalculateSavings = calculator().necessaryDataIsProvidedToCalculateSavings(newState);
			//newState.dateModified = action.dateModified;
			//
			//if (newState.necessaryDataIsProvidedToCalculateSavings) {
			//	newState.savings = calculator().calculateSavings(newState);
			//}

			return newState;

		default:
			return state;
	}
}
