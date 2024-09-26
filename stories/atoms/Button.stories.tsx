/* eslint-disable react/no-children-prop */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, SearchButton, StepperButton, FileButton, SIZES } from '@textkernel/oneui';
import { FaUpload } from 'react-icons/fa';

export default {
    title: 'Atoms/Button',
    component: Button,
    subcomponents: { SearchButton, StepperButton, FileButton },
} as Meta<typeof Button>;

type StoryButton = StoryObj<typeof Button>;

export const _Button: StoryButton = {
    name: 'Button',
    args: {
        size: SIZES[1],
        type: 'submit',
        children: 'Click me!',
        context: 'secondary',
    },
    render: (args) => <Button {...args} />,
};

type StorySearchButton = StoryObj<typeof SearchButton>;

export const _SearchButton: StorySearchButton = {
    name: 'SearchButton',
    args: {
        type: 'submit',
        children: '',
    },
    render: (args) => <SearchButton {...args} />,
};

type StoryStepperButton = StoryObj<typeof StepperButton>;

export const _StepperButton: StoryStepperButton = {
    name: 'StepperButton',
    args: {
        icon: 'plus',
    },
    render: (args) => <StepperButton {...args} />,
};

type StoryFileButton = StoryObj<typeof FileButton>;

export const _FileButton: StoryFileButton = {
    name: 'Upload button',
    args: {
        accept: 'application/JSON',
        children: (
            <>
                <FaUpload style={{ marginRight: '3px' }} />
                Upload a file
            </>
        ),
    },
    render: (args) => <FileButton {...args} />,
};
