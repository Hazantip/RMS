import * as React from 'react';
import PropTypes from 'prop-types';

import Text, { StyleGuide } from '../Text';
import * as css from './Button.scss';


const NORMAL_SIZE = 'NORMAL_SIZE';
const LARGE_SIZE = 'LARGE_SIZE';

export default class Button extends React.Component {
	static propTypes = {
		'className': PropTypes.any,
		'label': PropTypes.string,
		'onClick': PropTypes.func,
		'size': PropTypes.string,
		'disabled': PropTypes.bool,
		'refCB': PropTypes.func,
	}

	static defaultProps = {
		'size': NORMAL_SIZE,
	}

	static NORMAL_SIZE = NORMAL_SIZE
	static LARGE_SIZE = LARGE_SIZE

	/**
	 *
	 */
	render() {
		const {
			label, size, disabled, onClick, refCB,
		} = this.props;
		let className;
		let style;

		switch (size) {
			case LARGE_SIZE:
				className = css.button_large;
				style = StyleGuide.BUTTON_LARGE;
				break;

			default:
				className = css.button;
				style = StyleGuide.BUTTON;
				break;
		}

		return (
			<button
				className={[className, this.props.className, disabled ? css.disabled : ''].join(' ')}
				onClick={onClick} ref={refCB}
			>
				<Text
					className={css.label}
					{...style}
					text={label}
				/>
			</button>
		);
	}
}
