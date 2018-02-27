import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from 'Common/utils';
import * as s from './Grid.scss';

const Column = (props) => {
	const className = combineClassNames({
		'moduleClasses': [].concat(props.moduleClasses, props.params),
		'defaultProps': _.assignIn({}, props.defaultProps, props),
	}, s).trim();

	if (className) {
		props = {
			..._.omit(props.defaultProps, 'className'),
			..._.omit(props, ['moduleClasses', 'className', 'defaultProps', 'params']),
		};
	}

	return (
		<div className={className} {..._.omit(props, 'refCB')} ref={props.refCB}>
			{props.children}
		</div>
	);
};

Column.propTypes = {
	'className': PropTypes.any,
	'params': PropTypes.array,
	'defaultProps': PropTypes.object,
	'moduleClasses': PropTypes.array,
	'children': PropTypes.any.isRequired,
	'refCB': PropTypes.func,
};

export default Column;
