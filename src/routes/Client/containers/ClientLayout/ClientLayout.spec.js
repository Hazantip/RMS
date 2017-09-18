import React from 'react';
import { shallow } from 'enzyme';
import ClientLayout from './ClientLayout';

describe('<ClientLayout />', () => {
	it('should have a header called \'Get Started\'', () => {
		const wrapper = shallow(<ClientLayout />);
		const actual = wrapper.find('h2').text();
		const expected = 'Get Started';

		expect(actual).toEqual(expected);
	});

	it('should have a header with \'title\' class', () => {
		const wrapper = shallow(<ClientLayout />);
		const actual = wrapper.find('h2').prop('className');
		const expected = 'title';

		expect(actual).toEqual(expected);
	});

	it('should link to an unknown route path', () => {
		const wrapper = shallow(<ClientLayout />);
		const actual = wrapper.findWhere(n => n.prop('to') === '/badlink').length;
		const expected = 1;

		expect(actual).toEqual(expected);
	});
});
