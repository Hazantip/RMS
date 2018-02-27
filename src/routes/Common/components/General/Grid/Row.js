import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from 'Common/utils';
import * as s from './Grid.scss';

const Row = (props) => {
	const className = combineClassNames({
		'moduleClasses': [].concat(props.moduleClasses, props.params),
		'defaultProps': _.assignIn({}, props.defaultProps, props),
	}, s);

	if (className) {
		props = {
			..._.omit(props.defaultProps, 'className'),
			..._.omit(props, ['moduleClasses', 'className', 'defaultProps', 'params']),
		};
	}

	return (
		<div className={[s.row, className].join(' ')} {...props}>
			{props.children}
		</div>
	);
};

Row.propTypes = {
	'className': PropTypes.any,
	'params': PropTypes.array,
	'defaultProps': PropTypes.object,
	'moduleClasses': PropTypes.array,
	'children': PropTypes.any.isRequired,
};

export default Row;
