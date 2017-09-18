import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/testAction';
import AboutPage from '../../components/AboutPage/AboutPage';

export const ContainerPage = (props) => {
	console.log('container: ', props);

	return (
		<AboutPage
			testAction={props.actions.testAction}
			testProp={props.testProp}
		/>
	);
};

ContainerPage.propTypes = {
	actions: PropTypes.object.isRequired,
	testProp: PropTypes.string,
	//client: PropTypes.object
};

function mapStateToProps(state) {
	return {
		testProp: get(state, ['client', 'testProp']),
		//client: get(state, 'client'),
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
)(ContainerPage);
