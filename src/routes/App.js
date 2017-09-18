/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';

import ClientLayout from './Client/containers/ClientLayout/ClientLayout';
import NotFoundPage from './Client/components/NotFoundPage/NotFoundPage';
import Nav from './Client/components/Nav/Nav';
import AboutPage from './Client/components/AboutPage/AboutPage';
import AboutNestedPage from './Client/components/AboutNestedPage/AboutNestedPage';
import ContainerPage from './Client/containers/ContainerPage/ContainerPage';
import './Client/styles/client-styles.scss';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

// TODO: fix /about /about/nested isActive for both of them		- DONE: exact prop
// TODO: fix /about/nested - doesn't render nested component	- DONE: exact prop

class App extends React.Component {
	render() {
		return (
			<div>

				<Nav />

				<Switch>
					<Route exact path="/" component={ClientLayout} />
					<Route exact path="/about" component={AboutPage} />
					<Route path="/about/nested/nested" component={AboutNestedPage} />
					<Route path="/other/nested" component={AboutNestedPage} />
					<Route path="/container" component={ContainerPage} />
					<Route component={NotFoundPage}/>
					{/*<Route path="/admin" component={AdminLayout} />*/}
					{/*<Route path=":projectId" component={AboutNestedPage} />*/}
					{/*<Redirect from="/accounts" to="/users"/>*/}
				</Switch>

			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.element
};

export default App;
