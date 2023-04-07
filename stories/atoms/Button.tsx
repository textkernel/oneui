/* eslint-disable react/no-children-prop */
import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, SearchButton, StepperButton, FileButton, SIZES } from '@textkernel/oneui';
import { FaUpload } from 'react-icons/fa';

export default {
    title: 'Atoms/Button',
    component: Button,
    subcomponents: { SearchButton, StepperButton, FileButton },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const _Button = Template.bind({});
_Button.args = {
    size: SIZES[1],
    type: 'submit',
    children: 'Click me!',
};

export const ButtonAsALink = Template.bind({});
ButtonAsALink.storyName = 'Button as a link';
ButtonAsALink.args = {
    target: '_blank',
    isLink: true,
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

export const _FileButton = (args) => <FileButton {...args} />;
_FileButton.storyName = 'Upload button';
_FileButton.args = {
    accept: 'application/JSON',
    children: (
        <>
            <FaUpload style={{ marginRight: '3px' }} />
            Upload a file
        </>
    ),
};
