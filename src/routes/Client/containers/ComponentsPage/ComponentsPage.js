import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/testAction';
import Toggle from '../../components/Toggle/Toggle';
import Checkbox from '../../components/Checkbox/Checkbox';
import Radio from '../../components/Radio/Radio';
import TextField from '../../components/TextField/TextField';
import * as s from './ComponentsPage.scss';

export const ComponentsPage = () => {

	return (
		<div className={s.root}>
			<div className={s.item}>
				<div className={s.title}>Toggle</div>
				<Toggle
					isActive={true}
					//eslint-disable-next-line no-console
					onChange={() => { console.log('onChange'); }}
					//eslint-disable-next-line no-console
					onAfterChange={() => { console.log('onAfterChange'); }}
				/>
				<br/>
				<Toggle label={'Lorem ipsum dolor sit amet, consectetur adipisicing.'} style={{ width: 340 }} />
			</div>
			<div className={s.item}>
				<div className={s.title}>Checkbox</div>
				<Checkbox
					isActive={true}
					//eslint-disable-next-line no-console
					onChange={() => { console.log('onChange'); }}
					//eslint-disable-next-line no-console
					onAfterChange={() => { console.log('onAfterChange'); }}
				/>
				<br/>
				<Checkbox label={'Lorem ipsum dolor sit amet, consectetur.'} style={{ width: 240 }} />
			</div>
			<div className={s.item}>
				<div className={s.title}>Radio</div>
				<Radio isActive />
				<br/>
				<Radio label={'Lorem ipsum dolor sit amet, consectetur.'} style={{ width: 240 }} />
			</div>
			<div className={s.item}>
				<div className={s.title}>Text Field</div>
				<TextField />
				<br/>
				<TextField label={'Title: '} style={{ width: 240 }} />
			</div>
		</div>
	);
};

ComponentsPage.propTypes = {
	client: PropTypes.object
};

function mapStateToProps(state) {
	return {
		client: get(state, 'client'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	};
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
