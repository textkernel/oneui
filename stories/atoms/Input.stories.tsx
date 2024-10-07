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

export const _SearchInputControlled: StorySearchInput = {
    name: 'SearchInput',
    args: {
        placeholder: 'While typing, check your console log...',
        label: 'Label',
        helperText: 'Optional helper text',
        errorMessage: 'Error message',
        context: undefined,
        size: 'medium',
    },
    render: (args) => {
        const [value, setValue] = React.useState('');
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            setValue(e.target.value);
        };

        return <SearchInput {...args} value={value} onChange={handleChange} />;
    },
};
