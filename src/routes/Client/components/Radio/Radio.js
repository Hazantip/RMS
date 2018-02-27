import { noop } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import * as s from './Radio.scss';

class Radio extends React.PureComponent {
	static propTypes = {
		'isActive': PropTypes.bool,
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
		'isActive': false,
		'onChange': noop,
		'onAfterChange': noop,
	};

	state = {
		'isActive': this.props.isActive,
	};

	onChange(e) {
		this.props.onChange();
		this.setState({
			'isActive': e.target.checked,
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
				<label className={`${s.label} ${this.state.isActive ? s.active : ''}`}>
					<input
						type="radio"
						className={s.input}
						checked={this.state.isActive}
						onChange={this.onChange.bind(this)}
						name="defaultRadio"
						{...this.props.inputProps}
					/>
					{this.renderLabel()}
					<span className={s.box} />
				</label>
			</div>
		);
	}
}

export default Radio;
