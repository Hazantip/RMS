import _ from 'lodash';
import axios from 'axios';

// eslint-disable-next-line
function apiClient({ initialState, isBrowser, history }) {

	// eslint-disable-next-line
	return function apiClient({ url, data, cb = _.noop }) {

		const config = {
			'method': 'get',
			url,
		};

		return axios(config)
			.then(response => {
				if (response.status >= 200 && response.status < 300) {
					cb('apiClient callback');
					return response;
				}

			})
			.catch((error) => {
				error = JSON.parse(JSON.stringify(error));
				// eslint-disable-next-line
				console.error({ error });
			});
	};
}

export {
	apiClient
};
