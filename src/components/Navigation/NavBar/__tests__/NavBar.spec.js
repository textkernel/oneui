import React from 'react';
import toJson from 'enzyme-to-json';
import { NavBar } from '../NavBar';

describe('NavBar that renders a container for navigation', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <NavBar>
                <a href="/">in item</a>
                <a href="/">other</a>
            </NavBar>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
