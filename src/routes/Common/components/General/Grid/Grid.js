import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { combineClassNames } from 'Common/utils';
import * as s from './Grid.scss';

const Grid = (props) => {
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
		<div className={[s.grid, className].join(' ')} {...props}>
			{props.children}
		</div>
	);
};

Grid.propTypes = {
	'className': PropTypes.any,
	'params': PropTypes.array,
	'defaultProps': PropTypes.object,
	'moduleClasses': PropTypes.array,
	'children': PropTypes.any.isRequired,
};

Grid.STRETCH = 'stretch';
Grid.STRETCH_FILL = 'stretch-fill';

export default Grid;
