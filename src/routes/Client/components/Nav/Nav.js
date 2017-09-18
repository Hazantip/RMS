import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Nav = (props) => {
	console.log('nav: ', props);
	return (
		<nav>
			<Link to="/">Home</Link>
			{' | '}
			<NavLink exact to={'/about'}>About</NavLink>
			{' | '}
			<NavLink to="/about/nested/nested">About nested</NavLink>
			{' | '}
			<NavLink to="/other/nested">Other nested</NavLink>
			{' | '}
			<NavLink to="/container">Container</NavLink>
		</nav>
	);
};

export default Nav;
