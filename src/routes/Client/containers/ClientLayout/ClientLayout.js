//import { get } from 'lodash';
import React from 'react';
//import {Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
//import Nav from '../../components/Nav/Nav';
//import AboutPage from '../../components/AboutPage/AboutPage';
//import AboutNestedPage from '../../components/AboutNestedPage/AboutNestedPage';
//import ContainerPage from '../ContainerPage/ContainerPage';
import AxiosTester from '../../components/AxiosTester/AxiosTester';


const ClientLayout = () => {
	return (
		<div>
			{/*<Nav />*/}

			<h1>Welcome to client layout</h1>
			<h2 className="title">Get Started</h2>

			<Link to="/badlink">Go to badlink route --></Link>

			<AxiosTester />

			{/*<Route path="/about" component={AboutPage} />*/}
			{/*<Route path={`${get(props,'match.url')}about/nested/nested`} component={AboutNestedPage} />*/}
			{/*<Route path={`${get(props,'match.url')}other/nested`} component={AboutNestedPage} />*/}
			{/*<Route path={`${get(props,'match.url')}container`} component={ContainerPage} />*/}

		</div>
	);
};

export default ClientLayout;
