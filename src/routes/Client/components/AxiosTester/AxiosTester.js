import _ from 'lodash';
import React, { PureComponent } from 'react';
import { autobind } from 'core-decorators';
import axios from 'axios';

const api = {
	github: 'https://api.github.com/users/Hazantip',
	todos: 'http://jsonplaceholder.typicode.com/todos',
	airbnb: {
		experiences: 'https://www.airbnb.com/experiences/74856',
		users: 'https://www.airbnb.com/users/review_page/737319',
	},
};

@autobind
class AxiosTester extends PureComponent {
	state = {
		crossDomain: {
			data: '<h1>No Data</h1>'
		}
	};
	getData(url = api.github) {
		axios({
			method: 'get',
			url,
		})
			.then((res) => {
				console.info('response: ', res);
				this.setState({
					crossDomain: res.data,
				});
			})
			.catch((err) => {
				console.info('error: ', JSON.parse(JSON.stringify(err)));
			});
	}
	render() {
		console.log(`${this._reactInternalInstance.getName()}: `, this);
		return (
			<div style={{ 'padding': '15px 20px', 'borderRadius': 6, 'border': '1px solid grey', 'margin': '60px 0' }}>
				<h2>Axios Tester</h2>
				<button onClick={this.getData.bind(null, api.airbnb.users)}>Get data</button>
			</div>
		);
	}
}

export default AxiosTester;
