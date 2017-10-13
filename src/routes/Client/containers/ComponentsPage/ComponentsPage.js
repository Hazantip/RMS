import { get } from 'lodash';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Control, Form, actions as formActions, Errors } from 'react-redux-form';
import * as actions from '../../actions/testAction';
import Toggle from '../../components/Toggle/Toggle';
import Checkbox from '../../components/Checkbox/Checkbox';
import Radio from '../../components/Radio/Radio';
import TextField from '../../components/TextField/TextField';
import * as s from './ComponentsPage.scss';

function mapStateToProps(state) {
	return {
		client: get(state, 'client'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		actions: bindActionCreators(actions, dispatch),
	};
}

// show error if return true
const validations = {
	nameIsValid(name) {
		return name && name.length < 3;
	},
	required(val) {
		return !val || !val.length;
	}
};

/* eslint-disable no-console */
class ComponentsPage extends PureComponent {

	static propTypes = {
		client: PropTypes.object,
		dispatch: PropTypes.func
	};

	handleSubmit(user) {
		// Do whatever you like in here.
		// If you connect the UserForm to the Redux store,
		// you can dispatch actions such as:
		// dispatch(actions.submit('user', somePromise));
		// etc.
		console.log('handleSubmit user: ', user);
	}
	render() {
		return (
			<div className={s.root}>
				<Form
					model="clientForms"
					onSubmit={(form) => this.handleSubmit(form)}
				>

					<div className={s.item}>
						{/*NOTE: Validation way 1*/}
						<Control.text
							model="clientForms.section1.user.name"
							onBlur={() => {
								this.props.dispatch(formActions.validate('clientForms.section1.user.name', validations.nameIsValid));
							}}
						/>
						{/*NOTE: Validation way 2*/}
						<br />
						<Control.text
							model="clientForms.section2.user.name"
							validators={{
								'required': (val) => validations.required(val),
								'nameIsValid': (val) => validations.nameIsValid(val),
							}}
							errors={{
								'required': (val) => validations.required(val),
								'nameIsValid': (val) => validations.nameIsValid(val)
							}}
						/>
						<Errors
							model="clientForms.section2.user.name"
							show={{ 'valid': false }}
							component={(props) => <div className="error">{props.children}</div>}
							messages={{
								'required': 'Please provide a name.',
								'nameIsValid': (val) => `<${val}> is not a valid name.`,
							}}
						/>
						<br/>
						<button type="submit">SUBMIT</button>
					</div>

					{/* NOTE: Custom textField */}
					<div className={s.item}>
						<div className={s.title}>Text Field</div>
						<Control model="clientForms.section1.user.surname" component={TextField} />
						<br/>
						<Control model="clientForms.section1.user.surname" component={TextField} mapProps={{ 'fieldValue': props => props.fieldValue }} label="Title" style={{ width: 240 }} />
					</div>

					{/* NOTE: Custom checkbox */}
					<div className={s.item}>
						<div className={s.title}>Toggle</div>
						<Control model="clientForms.section1.user.isOpen" component={Toggle} label="Def true" style={{ width: 340 }} />
						<Control model="clientForms.section1.user.isOpen" component={Toggle} label="Def true" style={{ width: 340 }} />
						<br />
						<Control model="clientForms.section2.user.isOpen" component={Toggle} label="Def false" />
						<Control model="clientForms.section2.user.isOpen" component={Toggle} label="Def false" />
					</div>

					{/* TODO: React react form */}
					<div className={s.item}>
						<div className={s.title}>Checkbox</div>
						<Checkbox
							isActive={true}
							onChange={() => { console.log('onChange'); }}
							onAfterChange={() => { console.log('onAfterChange'); }}
						/>
						<br/>
						<Checkbox label={'Lorem ipsum dolor sit amet, consectetur.'} style={{ width: 240 }} />
					</div>

					{/* TODO: React react form */}
					<div className={s.item}>
						<div className={s.title}>Radio</div>
						<Radio isActive />
						<br/>
						<Radio label={'Lorem ipsum dolor sit amet, consectetur.'} style={{ width: 240 }} />
					</div>

				</Form>
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ComponentsPage);

/*
* NOTE: Components requirements:  SCSS, webpack modules, lodash
* */

/*
* TODO:
* 	+ toggle
* 	+ checkbox
* 	+ radiobutton
* 	- input
* 	- textArea
* 	- button (sm, md, xl, block, round)
* 	- table
* 	- tabs
* */
