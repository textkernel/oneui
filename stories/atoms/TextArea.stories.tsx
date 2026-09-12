import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from '@textkernel/oneui';

const meta: Meta<typeof TextArea> = {
    title: 'Atoms/TextArea',
    component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const DefaultBehavior: Story = {
    name: 'Default behavior',
    args: {
        defaultValue: 'This is a default value',
        placeholder: 'Some text goes here...',
        label: 'Label',
        labelStatus: 'Required',
        helperText: 'Help text',
        readOnly: false,
        disabled: false,
        copyCallback: (text) => console.log(text),
    },
    render: (args) => <TextArea {...args} />,
};

export const ControlledComponent: Story = {
    name: 'Controlled component',
    args: {
        placeholder: 'Type to get rid of the error...',
        label: 'Label',
        labelStatus: 'Required',
        readOnly: false,
        disabled: false,
        maxLength: 250,
        copyCallback: (text) => console.log(`Copied text: ${text}`),
    },
    render: (args) => {
        const [text, setText] = React.useState('');

        return (
            <TextArea
                {...args}
                value={text}
                errorText={text.length === 0 ? 'Field should not be empty' : undefined}
                onChange={(event) => {
                    setText(event.target.value);
                    console.log(event.target.value);
                }}
            />
        );
    },
};
