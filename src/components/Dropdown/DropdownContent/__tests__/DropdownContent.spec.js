import React from 'react';
import toJson from 'enzyme-to-json';
import DropdownContent from '../DropdownContent';

describe('<DropdownContent>', () => {
    it('should render a dropdown container correctly', () => {
        const wrapper = shallow(<DropdownContent>Some content</DropdownContent>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should apply classes according to props', () => {
        const wrapper = shallow(<DropdownContent shown>Some content</DropdownContent>);
        expect(wrapper.props().className).toEqual('DropdownContent DropdownContent--shown');
    });
});
