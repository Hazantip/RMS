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
		similar: 'https://www.airbnb.com/api/v2/similar_listings?key=d306zoyjsyarp7ifhu67rjxn52tv0t20&currency=USD&locale=en&_format=for_listing_card&listing_id=17735281'
	},
};

@autobind
class AxiosTester extends PureComponent {
	state = {
		'isLoading': false,
		'crossDomain': {
			'html': '<h1>No html content</h1>',
			'data': []
		}
	};
	setLoader(state) {
		this.setState({
			'isLoading': state,
		});
	}
	getData(url = api.github) {
		this.setLoader(true);
		const config = {
			'method': 'get',
			url,
		};
		axios(config)
			.then(response => {
				//eslint-disable-next-line no-console
				console.info({ response });
				if (response.status >= 200 && response.status < 300) {
					return response.data;
				}

			})
			.then(data => {
				this.setState({
					'isLoading': false,
					'crossDomain': {
						'html': _.get(data, 'review_content', '<h1>Response is different for html :(</h1>'),
						'data': _.get(data, 'similar_listings', ['Response is different for data :('])
					},
				});
			})
			.catch((error) => {
				this.setLoader(false);
				// error
				error = JSON.parse(JSON.stringify(error));
				//eslint-disable-next-line no-console
				console.warn({ error });
			});
	}
	renderData() {
		const {data} = this.state.crossDomain;

		if (this.state.isLoading) {
			return <h1>Loading....</h1>;
		}
		if (!data.length) {
			return <h1>No data....</h1>;
		}
		return (
			<ol>
				{
					_.map(data, (item, index) => {
						const distance = _.get(item, 'distance');
						const available = _.get(item, ['pricing_quote', 'available']);
						const amount_formatted = _.get(item, ['pricing_quote', 'rate', 'amount_formatted']);
						const listing = _.get(item, 'listing');
						const city = _.get(listing, 'city');
						const host_name = _.get(listing, ['primary_host', 'first_name']);
						const host_pic = _.get(listing, ['primary_host', 'picture_url']);
						const picture_urls = _.get(listing, ['picture_urls']);
						const scrim_color = _.get(listing, ['scrim_color']);

						return (
							<li key={`root_${index}_${distance}`} style={{ 'color': scrim_color, 'borderBottom': '1px solid grey', 'margin': '0 0 20px', 'padding': '20px 0' }}>
								<p><b>Available:</b> {available ? 'Yes' : 'No'} </p>
								<p><b>City:</b> {city} </p>
								<p><b>Distance:</b> {distance} </p>
								<p><b>Price:</b> {amount_formatted} </p>
								<p><b>Host name:</b> {host_name}  <img src={host_pic} alt="" style={{ 'display': 'inline-block', 'width': 40, 'margin': '0 15px', 'verticalAlign': 'middle' }} /></p>
								<p><b>Images:</b></p>
								<div style={{ 'display': 'flex', 'flexWrap': 'wrap', 'alignItems': 'flex-start' }}>
									{_.map(picture_urls, (picture_url, picture_url_index) => {
										return (
											<img key={`pic_${picture_url_index}_${picture_url}`} src={picture_url} alt="image" style={{ 'height': 150, 'border': '4px solid white' }} />
										);
									})}
								</div>
							</li>
						);
					})
				}
			</ol>
		);
	}

	render() {
		console.log(`${this._reactInternalInstance.getName()}: `, this);
		return (
			<div style={{ 'padding': '15px 20px', 'borderRadius': 6, 'border': '1px solid grey', 'margin': '60px 0' }}>
				<h2>Axios Tester</h2>
				<button onClick={this.getData.bind(null, api.airbnb.similar)}>Get data</button>
				<h3>Content</h3>
				<div
					//eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: this.state.crossDomain.html }}
				/>
				{this.renderData()}
			</div>
		);
	}
}

export default AxiosTester;
