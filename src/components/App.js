/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import {Switch, NavLink, Route} from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import AboutNestedPage from './AboutNestedPage';
import ContainerPage from '../containers/ContainerPage';
import NotFoundPage from './NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

// TODO: fix /about /about/nested isActive for both of them
// TODO: fix /about/nested - doesn't render nested component

class App extends React.Component {
	render() {
		const activeStyle = { color: 'crimson', 'fontWeight': 700 };
		return (
			<div>

				<div>
					<NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
					{' | '}
					<NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
					{' | '}
					<NavLink to="/about/nested" activeStyle={activeStyle}>About nested</NavLink>
					{' | '}
					<NavLink to="/aboutContainer" activeStyle={activeStyle}>About via container</NavLink>
				</div>

				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/about" component={AboutPage} />
					<Route path="/about/nested" component={AboutNestedPage} />
					<Route path="/aboutContainer" component={ContainerPage} />
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

{/*<Route path=":projectId" component={AboutNestedPage} />*/}
{/*<Route path="/about" component={AboutPage}/>*/}
{/*<Route path="/about/nested" component={AboutNestedPage}/>*/}
