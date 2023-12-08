import * as React from 'react';
import { BrowserRouter, NavLink } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { NavBar, NavItem } from '@textkernel/oneui';

const meta: Meta<typeof NavItem> = {
    title: 'Molecules/Navigation',
    component: NavItem,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { NavBar } as any,
};

export default meta;

type Story = StoryObj<typeof NavItem>;

export const _Navigation: Story = {
    name: 'Navigation',
    args: {
        active: true,
        pullRight: false,
        useActiveClass: false,
    },
    render: (args) => (
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
    ),
};
