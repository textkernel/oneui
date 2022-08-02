import * as React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { NavBar, NavItem } from '@textkernel/oneui';

storiesOf('Molecules/Navigation', module)
    .addDecorator(withKnobs)
    .add('Navigation', () => (
        <BrowserRouter>
            <NavBar>
                <NavItem>
                    <a href="/">Home</a>
                </NavItem>
                <NavItem active={boolean('active', true)}>
                    <a href="/">Active item</a>
                </NavItem>
                <NavItem
                    useActiveClass={boolean('useActiveClass', true)}
                    pullRight={boolean('pullRight', true)}
                >
                    <NavLink exact to="/">
                        Item on the right
                    </NavLink>
                </NavItem>
                <NavItem useActiveClass={boolean('useActiveClass', true)}>
                    <NavLink to="/">Active NavLink</NavLink>
                </NavItem>
            </NavBar>
        </BrowserRouter>
    ));
