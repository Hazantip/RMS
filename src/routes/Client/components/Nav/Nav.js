import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import * as s from './Nav.scss';

const Nav = (props) => {
	return (
		<nav className={s.nav}>
			<NavLink exact to="/" className={s.link} activeClassName={s.active}>Home</NavLink>
			<NavLink exact to={'/about'} className={s.link} activeClassName={s.active}>About</NavLink>
			<NavLink to="/about/nested/nested" className={s.link} activeClassName={s.active}>About nested</NavLink>
			<NavLink to="/other/nested" className={s.link} activeClassName={s.active}>Other nested</NavLink>
			<NavLink to="/container" className={s.link} activeClassName={s.active}>Container</NavLink>
			<NavLink to="/components" className={s.link} activeClassName={s.active}>components</NavLink>
		</nav>
	);
};

export default Nav;
