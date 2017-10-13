import { combineForms } from 'react-redux-form';

const initialUserState = {
	'user': 'Hazantip',
	'isOpen': true
};

export const clientForms = combineForms({
	section1: {
		user: initialUserState,
	},
	section2: {
		user: initialUserState,
	},
}, 'clientForms');	// last param is a model name
