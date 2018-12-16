import React from 'react';
import toJson from 'enzyme-to-json';
import DropdownItem from '../DropdownItem';

describe('<DropdownItem> that renders a dropdown item', () => {
    it('should render a default item correctly', () => {
        const wrapper = shallow(<DropdownItem>A dropdown item</DropdownItem>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(<DropdownItem disabled>Another dropdown item</DropdownItem>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
