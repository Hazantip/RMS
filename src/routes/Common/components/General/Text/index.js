import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import * as StyleGuide from './StyleGuide';
import * as scss from './Text.scss';

/**
 * General Text component which includes all text styles variations
 * accordingly to Rabbi Guidelines (ssh://rabbigitsuper/guidelines)
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const Text = (props) => {
	const {
		tag, text, children, family, size, weight, transform, color, ...rest
	} = props;
	const predefinedClasses = [
		scss[family],
		scss[size],
		scss[`w-${weight}`],
		scss[transform],
		scss[color],
	].join(' ').trim();
	const customClasses = _.get(rest, 'className');
	const className = [predefinedClasses, customClasses].join(' ').trim();
	const Component = tag;

	return (
		<Component {..._.omit(rest, 'refCB')} className={className} ref={props.refCB}>
			{text || children}
		</Component>
	);
};

Text.defaultProps = {
	'tag': 'div',
};

Text.propTypes = {
	'tag': PropTypes.string,
	'text': PropTypes.string,
	'family': PropTypes.string,
	'size': PropTypes.string,
	'weight': PropTypes.string,
	'transform': PropTypes.string,
	'color': PropTypes.string,
	'children': PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	'refCB': PropTypes.func,
	// default html attributes which are not directly related to current component
	'defaultProps': PropTypes.object,
};

export { StyleGuide };
export default Text;

/*
	Usage:
	`
		<Text
			tag="h1"
			family="sans"
			size="giga"
			weight="bold"
			transform="uppercase"
			color="error"
			text="Page title"
		/>
	`

**/

