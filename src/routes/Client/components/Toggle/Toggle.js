import _ from 'lodash';
import { autobind } from 'core-decorators';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actions as formActions } from 'react-redux-form';
import * as s from './Toggle.scss';

function mapDispatchToProps(dispatch) {
	return {
		'formChange': bindActionCreators(formActions.change, dispatch),
	};
}

@autobind
class Toggle extends React.PureComponent {
	static propTypes = {
		'value': PropTypes.bool.isRequired,
		'onChange': PropTypes.func,
		'formChange': PropTypes.func,
		'style': PropTypes.object,
		'label': PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.node,
		]),
	};

	static defaultProps = {
		'label': '',
	};

	onChange() {
		const name = _.get(this.props, 'name', '');
		const checked = this.props.value;
		this.props.formChange(name, !checked);
	}

	renderLabel() {
		if (!this.props.label) {
			return null;
		}
		return <span className={s.dataLabel}>{this.props.label}</span>;
	}

	render() {
		const inputProps = _.omit(this.props, ['fieldValue', 'formChange', 'onChange']);

		return (
			<div className={s.toggle} style={this.props.style}>
				<label className={`${s.label} ${this.props.value ? s.active : ''}`}>
					<input type="checkbox" className={s.input} onChange={this.onChange} {...inputProps} />
					{this.renderLabel()}
					<span className={s.box} />
				</label>
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(Toggle);
