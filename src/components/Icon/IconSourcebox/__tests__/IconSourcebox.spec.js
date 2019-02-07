import React from 'react';
import toJson from 'enzyme-to-json';
import IconSourcebox from '../IconSourcebox';

describe('<IconSourcebox>', () => {
    it('should render an Sourcebox icon', () => {
        const wrapper = shallow(<IconSourcebox />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
