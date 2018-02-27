import { noop } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import * as s from './TextField.scss';

class TextField extends React.PureComponent {
	static propTypes = {
		'inputProps': PropTypes.object,
		'style': PropTypes.object,
		'onChange': PropTypes.func,
		'onAfterChange': PropTypes.func,
		'label': PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
	};

	static defaultProps = {
		'value': false,
		'onChange': noop,
		'onAfterChange': noop,
	};

	state = {
		'value': '',
	};

	onChange(e) {
		this.props.onChange();
		this.setState({
			'value': e.target.value,
		}, this.props.onAfterChange);
	}

	renderLabel() {
		if (!this.props.label) {
			return null;
		}
		return <span className={s.dataLabel}>{this.props.label}</span>;
	}

	render() {
		return (
			<div className={s.radio} style={this.props.style}>
				<label className={`${s.label} ${this.state.value ? s.active : ''}`}>
					{this.renderLabel()}
					<input
						type="text"
						className={s.input}
						onChange={this.onChange.bind(this)}
						value={this.state.value}
						{...this.props.inputProps}
					/>
				</label>
			</div>
		);
	}
}

export default TextField;
