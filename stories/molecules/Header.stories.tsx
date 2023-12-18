import * as React from 'react';
import { Header, IconTextkernel } from '@textkernel/oneui';
import { ComponentStory } from '@storybook/react';

export default {
    title: 'Molecules/Header',
    component: Header,
};

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const HeaderWithSimpleLogo = Template.bind({});
HeaderWithSimpleLogo.storyName = 'Header with simple logo';
HeaderWithSimpleLogo.args = {
    logo: {
        src: 'https://www.jobfeed.nl/images/jobfeed-logo.svg',
        link: '/',
        title: 'Jobfeed',
    },
    children: 'This is a placeholder for children',
};

export const HeaderWithLogoAsComponent = Template.bind({});
HeaderWithLogoAsComponent.storyName = 'Header with logo as component';
HeaderWithLogoAsComponent.args = {
    logo: <IconTextkernel />,
    children: 'This is a placeholder for children',
};
