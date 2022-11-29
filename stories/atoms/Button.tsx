/* eslint-disable react/no-children-prop */
import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, SearchButton, StepperButton } from '@textkernel/oneui';
import { CONTEXTS, SIZES } from '../../src/constants';

export default {
    title: 'Atoms/Button',
    component: Button,
    subcomponents: { SearchButton, StepperButton },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const _Button = Template.bind({});
_Button.args = {
    context: CONTEXTS[0],
    isPrimary: true,
    isNeutral: false,
    size: SIZES[1],
    type: 'submit',
    children: 'Click me!',
};

export const ButtonAsALink = Template.bind({});
ButtonAsALink.storyName = 'Button as a link';
ButtonAsALink.args = {
    target: '_blank',
    context: CONTEXTS[0],
    size: SIZES[1],
    href: 'https://github.com/textkernel/oneui',
    children: 'Click me!',
};

export const _SearchButton = (args) => <SearchButton {...args} />;
_SearchButton.storyName = 'SearchButton';
_SearchButton.args = {
    type: 'submit',
    children: '',
};

export const _StepperButton = (args) => <StepperButton {...args} />;
_StepperButton.storyName = 'StepperButton';
_StepperButton.args = {
    icon: 'plus',
};
