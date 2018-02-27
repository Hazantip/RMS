import * as React from 'react';
import PropTypes from 'prop-types';
import { TweenMax, TimelineMax, Power0 } from 'gsap';
import _ from 'lodash';

import Text from '../Text';
import * as css from './AnimatedText.scss';


export default class AnimatedText extends React.Component {
	static propTypes = {
		'className': PropTypes.string,
		'children': PropTypes.string,
		'isShown': PropTypes.bool,
		'showingTime': PropTypes.number,
		'hidingTime': PropTypes.number,
		'rowDelays': PropTypes.bool,
		'refCB': PropTypes.func,
	}

	static defaultProps = {
		'isShown': false,
		'showingTime': 1.5,
		'hidingTime': 1,
		'rowDelays': false,
	}

	/**
	 *
	 * @param {*} props
	 */
	constructor(props) {
		super(props);

		this.container = null;
		this.timeline = null;

		this.state = {
			'text': props.children,
		};
	}

	/**
	 *
	 */
	componentDidMount() {
		TweenMax.set(this.container.querySelectorAll(`.${css.word}`), { 'opacity': 0 });
		if (this.props.isShown) {
			this.animate('in');
		}
	}

	/**
	 *
	 * @param {*} nextProps
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.children !== this.props.children) {
			this.setState({ 'text': nextProps.children }, () => {
				TweenMax.set(this.container.querySelectorAll(`.${css.word}`), { 'opacity': 0 });
			});
		}
	}

	/**
	 *
	 * @param {*} nextProps
	 * @param {*} nextState
	 */
	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextProps.isShown !== this.props.isShown ||
			nextProps.children !== this.props.children ||
			nextState.children !== this.state.children
		);
	}

	/**
	 *
	 * @param {*} nextProps
	 */
	componentDidUpdate(prevProps) {
		if (this.props.isShown !== prevProps.isShown) {
			this.animate(this.props.isShown ? 'in' : 'out');
		}
	}

	/**
	 *
	 */
	getWordsData() {
		const words = this.container.querySelectorAll(`.${css.word}`);
		const wordsData = [];
		let rowIndex = 0;
		let indexInRow = 0;
		let rowMaxLength = 0;

		words.forEach((word, index) => {
			const { offsetTop } = word;

			if (index > 0) {
				if (wordsData[index - 1].offsetTop !== offsetTop) {
					rowIndex++;
					if (indexInRow > rowMaxLength) {
						rowMaxLength = indexInRow;
					}
					indexInRow = 0;
				}
			}
			wordsData[index] = {
				word, offsetTop, rowIndex, indexInRow,
			};
			indexInRow++;
		});

		return {
			'words': wordsData,
			'rowsAmount': rowIndex + 1,
			rowMaxLength,
		};
	}

	/**
	 *
	 * @param {string} direction
	 */
	animate(direction) {
		if (this.timeline) {
			this.timeline.kill();
		}
		switch (direction) {
			case 'in':
				this.animateIn();
				break;
			case 'out':
				this.animateOut();
				break;

			default:
				break;
		}
	}

	/**
	 *
	 */
	animateIn() {
		const data = this.getWordsData();
		const { showingTime, rowDelays } = this.props;
		const { rowsAmount } = data;

		const rowDelay = (showingTime / rowsAmount) * 0.2;
		const rowTime = (showingTime - (rowDelay * rowsAmount));
		let wordDelay = showingTime * 0.0375;
		let wordTime = rowTime - (wordDelay * data.rowMaxLength);

		if (!rowDelays) {
			wordDelay = (showingTime / data.words.length) * 0.5;
			wordTime = (showingTime - (data.words.length * wordDelay));
		}

		this.timeline = new TimelineMax();
		data.words.forEach((item, index) => {
			item.word.style.opacity = 0;
			this.timeline.add(TweenMax.to(item.word, wordTime, {
				'delay': rowDelays
					? (rowDelay * item.rowIndex) + (wordDelay * item.indexInRow)
					: wordDelay * index,
				'opacity': 1,
				'ease': Power0.easeNone,
			}), 0);
		});
	}

	/**
	 *
	 */
	animateOut() {
		const data = this.getWordsData();
		const { hidingTime } = this.props;
		const { rowsAmount } = data;
		const rowDelay = (hidingTime / rowsAmount) * 0.5;
		const rowTime = (hidingTime - (rowDelay * rowsAmount));

		this.timeline = new TimelineMax();
		data.words.forEach((item, index) => {
			this.timeline.add(TweenMax.to(item.word, rowTime, {
				'delay': rowDelay * item.rowIndex,
				'opacity': 0,
				'ease': Power0.easeNone,
			}), 0);
		});
	}

	/**
	 *
	 */
	render() {
		const { className } = this.props;
		const { text } = this.state;

		return (
			<Text
				{..._.omit(this.props, 'isShown', 'showingTime', 'hidingTime', 'rowDelays')}
				className={[css.animatedText, className].join(' ')}
				refCB={(el) => {
					this.container = el;
					if (this.props.refCB) {
						this.props.refCB(el);
					}
				}}
			>
				{
					text.split(' ').map((word, index) => (
						<span
							className={css.word}
							key={`${word + index}`}
						>
							{`${word.trim()}`}&nbsp;
						</span>
					))
				}
			</Text>
		);
	}
}
