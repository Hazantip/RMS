/* eslint-disable import/default */

import 'normalize.css';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import configureStore, {history} from './store';
import Root from './routes/Root';
import './styles/main.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
require('./favicon.ico'); // Tell webpack to load favicon.ico
const store = configureStore();

render(
	<AppContainer>
		<Root store={store} history={history}/>
	</AppContainer>,
	document.getElementById('app')
);

if (module.hot) {
	module.hot.accept('./routes/Root', () => {
		const NewRoot = require('./routes/Root').default;
		render(
			<AppContainer>
				<NewRoot store={store} history={history}/>
			</AppContainer>,
			document.getElementById('app')
		);
	});
}
