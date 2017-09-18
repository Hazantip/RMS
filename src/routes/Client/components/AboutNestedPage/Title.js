
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

// Since this component is simple and static, there's no parent container for it.
const Title = ({ match }) => {
	return (
		<h1>
			Params: {get(match, 'params.topicId')}
		</h1>
	);
};

Title.propTypes = {
	'match': PropTypes.object,
};

export default Title;
