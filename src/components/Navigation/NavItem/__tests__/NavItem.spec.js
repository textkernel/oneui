import React from 'react';
import toJson from 'enzyme-to-json';
import { NavLink, BrowserRouter } from 'react-router-dom';
import NavItem from '../NavItem';

describe('NavItem that renders a single navigation item', () => {
    it('should render correctly with default props', () => {
        const wrapper = mount(
            <NavItem>
                <a href="/">item</a>
            </NavItem>
        );
        expect(wrapper.find('a').props().className).toEqual('NavItem');
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should add active class', () => {
        const wrapper = mount(
            <NavItem active>
                <a href="/">item</a>
            </NavItem>
        );
        expect(wrapper.find('a').props().className).toEqual('NavItem NavItem--active');
        expect(wrapper.find('a').props()['aria-current']).toEqual('page');
    });
    it('should add pullRight class', () => {
        const wrapper = mount(
            <NavItem pullRight>
                <a href="/">item</a>
            </NavItem>
        );
        expect(wrapper.find('a').props().className).toEqual('NavItem NavItem--pullRight');
    });
    it('should add activeClassName class', () => {
        const wrapper = mount(
            <BrowserRouter>
                <NavItem useActiveClass>
                    <NavLink to="/else">item</NavLink>
                </NavItem>
            </BrowserRouter>
        );
        expect(wrapper.find('a').props().className).toEqual('NavItem');
        expect(wrapper.find('NavLink').props().activeClassName).toEqual('NavItem__active');
    });
    it('should throw when more then 1 child is added', () => {
        // suppress expected console errors
        jest.spyOn(console, 'error').mockImplementationOnce(() => undefined);
        jest.spyOn(console, 'error').mockImplementationOnce(() => undefined);

        expect(() =>
            mount(
                <NavItem>
                    <a href="/">item</a>
                    <a href="/">extra</a>
                </NavItem>
            )
        ).toThrow();
    });
});
