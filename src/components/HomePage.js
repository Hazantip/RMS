import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => {
	return (
		<div>
			<h1>Home Page</h1>

			<h2>Get Started</h2>
			<ol>
				<li>Review the <Link to="/about">about page</Link></li>
				<li>Review the <Link to="/about/nested">nested page</Link></li>
			</ol>
		</div>
	);
};

export default HomePage;
