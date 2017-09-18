/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import {Switch, NavLink, Route} from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import AboutNestedPage from './AboutNestedPage';
import ContainerPage from '../containers/ContainerPage';
import NotFoundPage from './NotFoundPage';
import '../styles/client-styles.scss';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

// TODO: fix /about /about/nested isActive for both of them		- DONE: exact prop
// TODO: fix /about/nested - doesn't render nested component	- DONE: exact prop

class App extends React.Component {
	render() {
		return (
			<div>

				<nav>
					<NavLink exact to="/">Home</NavLink>
					{' | '}
					<NavLink exact to="/about">About</NavLink>
					{' | '}
					<NavLink exact to="/about/nested/nested">About nested</NavLink>
					{' | '}
					<NavLink to="/other/nested">Other nested</NavLink>
					{' | '}
					<NavLink to="/container">Container</NavLink>
				</nav>

				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/about" component={AboutPage} />
					<Route exact path="/about/nested/nested" component={AboutNestedPage} />
					<Route path="/other/nested" component={AboutNestedPage} />
					<Route path="/container" component={ContainerPage} />
					{/*<Route path=":projectId" component={AboutNestedPage} />*/}
					<Route component={NotFoundPage}/>
				</Switch>

			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element
};

export default App;
