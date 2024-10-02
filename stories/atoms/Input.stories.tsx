/* eslint-disable react/no-children-prop */
import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, SearchInput } from '@textkernel/oneui';

export default {
    title: 'Atoms/Input',
    component: Input,
    argTypes: {
        context: {
            control: { type: 'radio' },
            options: [undefined, 'critical'],
        },
    },
} as Meta<typeof Input>;

type StoryInput = StoryObj<typeof Input>;

export const _Input: StoryInput = {
    name: 'Input',
    args: {
        placeholder: 'While typing, check your console log...',
        label: 'Label',
        helperText: 'Optional helper text',
        errorMessage: 'Error message',
        context: undefined,
    },
    render: (args) => <Input {...args} />,
};

type StorySearchInput = StoryObj<typeof SearchInput>;

export const _SearchInput: StorySearchInput = {
    name: 'SearchInput',
    args: {
        placeholder: 'While typing, check your console log...',
        label: 'Label',
        helperText: 'Optional helper text',
        errorMessage: 'Error message',
        context: undefined,
        size: 'medium',
    },
    render: (args) => <SearchInput {...args} />,
};

export const _SearchInputWithValue: StorySearchInput = {
    name: 'SearchInput with value',
    args: {
        placeholder: 'While typing, check your console log...',
        label: 'Label',
        helperText: 'Optional helper text',
        errorMessage: 'Error message',
        context: undefined,
        size: 'medium',
        value: 'This is the value',
    },
    render: (args) => <SearchInput {...args} />,
};
