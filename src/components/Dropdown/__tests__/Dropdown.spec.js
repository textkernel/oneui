import React from 'react';
import toJson from 'enzyme-to-json';
import Dropdown from '../Dropdown';
import DropdownItem from '../../DropdownItem';

describe('<Dropdown> that renders a dropdown element', () => {
    it('should render a default item correctly', () => {
        const wrapper = shallow(
            <Dropdown label="My dropdown">
                <DropdownItem>Some item</DropdownItem>
                <DropdownItem>Another item</DropdownItem>
                <DropdownItem>More items</DropdownItem>
            </Dropdown>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <Dropdown label="My dropdown" context="primary" size="large" disabled isBlock>
                <DropdownItem>Some item</DropdownItem>
                <DropdownItem>Another item</DropdownItem>
                <DropdownItem>More items</DropdownItem>
            </Dropdown>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
