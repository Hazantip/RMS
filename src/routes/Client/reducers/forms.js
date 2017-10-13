import { combineForms } from 'react-redux-form';

const initialUser1State = {
	'name': 'John',
	'surname': 'Doe',
	'isOpen': true
};

const initialUser2State = {
	'name': 'Mary',
	'surname': 'Simpson',
	'isOpen': false
};


export const clientForms = combineForms({
	section1: {
		user: initialUser1State,
	},
	section2: {
		user: initialUser2State,
	},
}, 'clientForms');	// last param is a model name
