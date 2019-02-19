import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { NavBar, NavItem, NavLinkItem } from '@textkernel/oneui';

storiesOf('Navigation', module)
    .addDecorator(withKnobs)
    .add('Simple navigation', () => (
        <NavBar>
            <NavItem href="/">Home</NavItem>
            <NavItem href="/" active={boolean('active', true)}>
                Another item
            </NavItem>
            <NavItem href="/" pullRight={boolean('pullRight', true)}>
                Item on the right
            </NavItem>
            <NavItem href="/">Yet another item</NavItem>
        </NavBar>
    ))
    .add('With React Router', () => (
        <BrowserRouter>
            <NavBar>
                <NavLinkItem exact to="/">
                    Home
                </NavLinkItem>
                <NavLinkItem to="/another">Another item</NavLinkItem>
                <NavLinkItem to="/on-right" pullRight={boolean('pullRight', true)}>
                    Item on the right
                </NavLinkItem>
                <NavLinkItem to="/yet-another">Yet another item</NavLinkItem>
            </NavBar>
        </BrowserRouter>
    ));
