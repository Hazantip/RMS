import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/defaultAction';
import AboutPage from '../../components/AboutPage/AboutPage';

export const ContainerPage = (props) => {
	return (
		<AboutPage
			defaultAction={props.actions.defaultAction}
			name={props.name}
		/>
	);
};

ContainerPage.propTypes = {
	actions: PropTypes.object.isRequired,
	name: PropTypes.string
};

function mapStateToProps(state) {
	return {
		name: get(state, ['client', 'name'])
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
