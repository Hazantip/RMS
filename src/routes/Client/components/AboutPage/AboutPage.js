import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as css from '../../styles/about-page.css';

const AboutPage = (props) => {
	const action = get(props, 'testAction');

	return (
		<div>
			<h2 className={`${css.altHeader}`}>About</h2>
			<button
				onClick={() => {
					action(`${Math.random()}`);
				}}
			>
				Test demo action
			</button>
			<p>
				Test prop: {get(props, 'testProp')}
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequatur dolores, et ipsa
				mollitia nesciunt nihil nulla numquam odit officia omnis perspiciatis recusandae repudiandae unde.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequatur dolores, et ipsa
				mollitia nesciunt nihil nulla numquam odit officia omnis perspiciatis recusandae repudiandae unde.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequatur dolores, et ipsa
				mollitia nesciunt nihil nulla numquam odit officia omnis perspiciatis recusandae repudiandae unde.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequatur dolores, et ipsa
				mollitia nesciunt nihil nulla numquam odit officia omnis perspiciatis recusandae repudiandae unde.
			</p>
			<p>
				<Link to="/badlink">Click this bad link</Link> to see the 404 page.
			</p>
			<p>
				<Link to="/">Go to home</Link>
			</p>
			<h4>img tag</h4>
			<img className="image" src="/assets/images/bg.jpg" alt="" />
			<h4>background image</h4>
			<div className="image-bg" />
		</div>
	);
};

AboutPage.propTypes = {
	'testProp': PropTypes.string,
};

export default AboutPage;
