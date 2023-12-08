import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Header, IconTextkernel } from '@textkernel/oneui';

const meta: Meta<typeof Header> = {
    title: 'Molecules/Header',
    component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const HeaderWithSimpleLogo: Story = {
    name: 'Header with simple logo',
    args: {
        logo: {
            src: 'https://www.jobfeed.nl/images/jobfeed-logo.svg',
            link: '/',
            title: 'Jobfeed',
        },
        children: 'This is a placeholder for children',
    },
    render: (args) => <Header {...args} />,
};

export const HeaderWithLogoAsComponent: Story = {
    name: 'Header with logo as component',
    args: {
        logo: <IconTextkernel />,
        children: 'This is a placeholder for children',
    },
    render: (args) => <Header {...args} />,
};
