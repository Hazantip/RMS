import _ from 'lodash';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TweenMax, TimelineMax, Back, Power0 } from 'gsap';
import { isMobile } from 'Common/utils/mediaQuery';

import Button from '../Button';
import * as css from './PopUp.scss';

export default class PopUp extends React.Component {
	static propTypes = {
		'in': PropTypes.bool,
		'className': PropTypes.any,
		'children': PropTypes.any,
		'action': PropTypes.func,
		'actionLabel': PropTypes.string,
		'animationListener': PropTypes.func,
		'contentTop': PropTypes.string,
		'contentBottom': PropTypes.string,
	}

	static defaultProps = {
		'contentTop': '10%',
		'contentBottom': '10%',
	}

	static ANIMATION_COMPLETE = 'ANIMATION_COMPLETE';
	static BG_ANIMATION_COMPLETE = 'BG_ANIMATION_COMPLETE';
	static CONTENT_ANIMATION_START = 'CONTENT_ANIMATION_START';
	static CONTENT_ANIMATION_COMPLETE = 'CONTENT_ANIMATION_COMPLETE';
	static UI_ANIMATION_COMPLETE = 'UI_ANIMATION_COMPLETE';

	/**
	 *
	 */
	constructor() {
		super();

		this.timeline = null;
		this.bg = null;
		this.content = null;
		this.actionBtn = null;
		this.actionClick = this.actionClick.bind(this);
	}

	/**
	 *
	 */
	componentDidMount() {
		this.reset();

		if (this.props.in) {
			this.animate('in');
		}
	}

	/**
	 *
	 * @param {*} nextProps
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.in !== this.props.in) {
			this.animate(nextProps.in ? 'in' : 'out');
		}
	}

	/**
	 * reset styles for starting of show-animation
	 */
	reset() {
		if (this.timeline) {
			this.timeline.kill();
		}
		TweenMax.set(this.bg, { 'scale': 1.05, 'opacity': 0 });
		TweenMax.set(this.contentWrap, { 'opacity': 1 });
		TweenMax.set(this.actionBtn, { 'opacity': 0 });
	}

	/**
	 *
	 * @param {string} direction
	 */
	animate(direction) {
		const time = 1;

		switch (direction) {
			case 'in':
				this.timeline = new TimelineMax({
					'onComplete': () => {
						this.props.animationListener({
							'type': PopUp.ANIMATION_COMPLETE,
							'in': true,
							'tl': this.timeline,
						});
					},
				});

				this.timeline.add(TweenMax.to(this.bg, time * 0.5, {
					'scale': 1, 'ease': Back.easeOut,
				}));
				this.timeline.add(TweenMax.to(this.bg, time * 0.5, {
					'opacity': 1,
					'ease': Power0.easeNone,
					'onComplete': () => {
						this.props.animationListener({
							'type': PopUp.BG_ANIMATION_COMPLETE,
							'in': true,
							'tl': this.timeline,
						});
					},
				}), 0);
				this.timeline.add(() => {
					this.props.animationListener({
						'type': PopUp.CONTENT_ANIMATION_START,
						'in': true,
						'tl': this.timeline,
					});
				}, 0.2);
				this.timeline.add(TweenMax.to(this.actionBtn, time * 0.5, {
					'opacity': 1,
					'onComplete': () => {
						this.props.animationListener({
							'type': PopUp.UI_ANIMATION_COMPLETE,
							'in': true,
							'tl': this.timeline,
						});
					},
				}));
				break;

			case 'out':
				this.timeline = new TimelineMax({
					'onComplete': () => {
						this.props.animationListener({
							'type': PopUp.ANIMATION_COMPLETE,
							'in': false,
							'tl': this.timeline,
						});
					},
				});

				this.timeline.add(TweenMax.to(this.contentWrap, time * 0.5, {
					'opacity': 0,
					'onComplete': () => {
						this.props.animationListener({
							'type': PopUp.CONTENT_ANIMATION_COMPLETE,
							'in': false,
							'tl': this.timeline,
						});
					},
				}));
				this.timeline.add(TweenMax.to(this.bg, time, {
					'scale': !isMobile() ? 0.975 : 1, 'opacity': 0,
				}), 0);
				break;

			default:
				break;
		}
	}

	/**
	 *
	 */
	actionClick() {
		this.props.action();
	}

	/**
	 *
	 */
	render() {
		const { contentTop, contentBottom } = this.props;

		return (
			<Transition
				{..._.omit(this.props, 'action', 'actionLabel', 'contentTop', 'contentBottom', 'animationListener')}
				appear={true}
				unmountOnExit={true}
			>
				<div className={[css.popUp, this.props.className].join(' ')}>
					<div className={css.bg} ref={el => this.bg = el} />
					<div
						className={css.contentWrap}
						ref={el => this.contentWrap = el}
						style={{ 'top': contentTop, 'bottom': contentBottom }}
					>
						<div className={css.content} ref={el => this.content = el}>
							{ this.props.children }
						</div>
						<Button
							className={css.actionBtn}
							label={this.props.actionLabel}
							size={Button.LARGE_SIZE}
							onClick={this.actionClick}
							refCB={el => this.actionBtn = el}
						/>
					</div>
				</div>
			</Transition>
		);
	}
}
