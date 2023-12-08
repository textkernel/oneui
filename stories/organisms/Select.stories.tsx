import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@textkernel/oneui';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '@textkernel/oneui/components/SelectComponents/Autosuggest/__mocks__/suggestions';

type TSuggestion = { name: string };

const meta: Meta<typeof Select> = {
    title: 'Organisms/Select Components/Select',
    component: Select,
};

export default meta;

type Story = StoryObj<typeof Select<TSuggestion>>;

export const _Select: Story = {
    name: 'Select',
    args: {
        style: { width: '650px' },
        items: SUGGESTIONS,
        itemToString: SUGGESTION_TO_STRING,
        onClear: undefined,
    },
    render: (args) => {
        const [selectedItem, setSelectedItem] = React.useState<TSuggestion>(SUGGESTIONS[0]);

        const onChange = (item) => {
            console.log(`onChange was called with {name: ${item.name}}`);
            setSelectedItem(item);
        };

        return <Select<TSuggestion> {...args} selectedItem={selectedItem} onChange={onChange} />;
    },
};

export const Clearable: Story = {
    name: 'Clearable',
    args: {
        style: { width: '650px' },
        items: SUGGESTIONS,
        itemToString: SUGGESTION_TO_STRING,
        clearTooltipLabel: 'Clear',
        placeholder: 'Choose item...',
    },
    render: (args) => {
        const [selectedItem, setSelectedItem] = React.useState<TSuggestion | undefined>(
            SUGGESTIONS[0]
        );

        const onChange = (item) => {
            console.log(`onChange was called with {name: ${item.name}}`);
            setSelectedItem(item);
        };

        const onClear = () => {
            console.log('onClear was called');
            setSelectedItem(undefined);
        };

        return (
            <Select<TSuggestion>
                {...args}
                selectedItem={selectedItem}
                onChange={onChange}
                onClear={onClear}
            />
        );
    },
};
