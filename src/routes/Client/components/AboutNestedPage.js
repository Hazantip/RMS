import { get } from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/about-page.css';

// Since this component is simple and static, there's no parent container for it.
const AboutNestedPage = (props) => {
	return (
		<div>
			<h2 className="alt-header">About Nested Page at {get(props, 'location.pathname', '???')}</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequatur dolores, et ipsa
				mollitia nesciunt nihil nulla numquam odit officia omnis perspiciatis recusandae repudiandae unde.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur consequatur dolores, et ipsa
				mollitia nesciunt nihil nulla numquam odit officia omnis perspiciatis recusandae repudiandae unde.
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
			<img className="image" src="/assets/images/bg.jpg" alt=""/>
			<h4>background image</h4>
			<div className="image-bg" />
		</div>
	);
};

export default AboutNestedPage;
