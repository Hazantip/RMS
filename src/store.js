import {applyMiddleware, compose, createStore} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import {routerMiddleware} from 'react-router-redux';
import rootReducer from './createReducers';
import {apiClient} from './apiClient';

export const history = createHistory();

function configureStoreProd(initialState) {
	const reactRouterMiddleware = routerMiddleware(history);
	const isBrowser = typeof window !== 'undefined';
	const thunkExtraArguments = {
		'apiClient': apiClient({initialState, isBrowser, history}),
	};
	const middlewares = [
		// Add other middleware on this line...

		// thunk middleware can also accept an extra argument to be passed to each thunk action
		// https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
		thunk.withExtraArgument(thunkExtraArguments),
		reactRouterMiddleware,
	];

	return createStore(rootReducer, initialState, compose(
		applyMiddleware(...middlewares)
		)
	);
}

function configureStoreDev(initialState) {
	const reactRouterMiddleware = routerMiddleware(history);

	const isBrowser = typeof window !== 'undefined';

	const thunkExtraArguments = {
		'apiClient': apiClient({initialState, isBrowser, history}),
	};

	const middlewares = [
		// Add other middleware on this line...

		// Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
		reduxImmutableStateInvariant(),

		// thunk middleware can also accept an extra argument to be passed to each thunk action
		// https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
		thunk.withExtraArgument(thunkExtraArguments),
		reactRouterMiddleware,
	];

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
	const store = createStore(rootReducer, initialState, composeEnhancers(
		applyMiddleware(...middlewares)
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('./', () => {
			const nextReducer = require('./createReducers').default; // eslint-disable-line global-require
			store.replaceReducer(nextReducer);
		});
	}

	return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
