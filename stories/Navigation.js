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
                Else
            </NavItem>
            <NavItem href="/" pullRight={boolean('pullRight', true)}>
                On the right
            </NavItem>
            <NavItem href="/">Other</NavItem>
        </NavBar>
    ))
    .add('react navigation', () => (
        <BrowserRouter>
            <NavBar>
                <NavLinkItem exact to="/">
                    Home
                </NavLinkItem>
                <NavLinkItem to="/">Else</NavLinkItem>
                <NavLinkItem to="/right" pullRight={boolean('pullRight', true)}>
                    On the right
                </NavLinkItem>
                <NavLinkItem to="/else">Other</NavLinkItem>
            </NavBar>
        </BrowserRouter>
    ));
