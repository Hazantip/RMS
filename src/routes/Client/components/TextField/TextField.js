import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import * as s from './TextField.scss';

class TextField extends React.PureComponent {
	static propTypes = {
		'value': PropTypes.string,
		'style': PropTypes.object,
		'label': PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		])
	};

	static defaultProps = {
		'style': {},
		'value': '',
	};

	renderLabel() {
		if (!this.props.label) {
			return null;
		}
		return <span className={s.dataLabel}>{this.props.label}</span>;
	}

	render() {
		const inputProps = _.omit(this.props, ['label', 'style', 'fieldValue']);
		const { value, style } = this.props;
		return (
			<div className={s.radio} style={style}>
				<label className={`${s.label} ${value ? s.active : ''}`}>
					{this.renderLabel()}
					<input type="text" className={s.input} {...inputProps} />
				</label>
			</div>
		);
	}
}

export default TextField;
