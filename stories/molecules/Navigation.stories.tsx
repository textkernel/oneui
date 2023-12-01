import * as React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { NavBar, NavItem } from '@textkernel/oneui';

export default {
    title: 'Molecules/Navigation',
    component: NavItem,
    subcomponents: { NavBar },
};

export const Navigation = (args) => (
    <BrowserRouter>
        <NavBar>
            <NavItem>
                <a href="/">Home</a>
            </NavItem>
            <NavItem {...args}>
                <a href="/">Active item</a>
            </NavItem>
            <NavItem useActiveClass pullRight routerVersion={6}>
                <NavLink end to="/somewhere">
                    Item on the right
                </NavLink>
            </NavItem>
            <NavItem useActiveClass routerVersion={6}>
                <NavLink to="/">Active NavLink</NavLink>
            </NavItem>
        </NavBar>
    </BrowserRouter>
);
Navigation.args = {
    active: true,
    pullRight: false,
    useActiveClass: false,
};
