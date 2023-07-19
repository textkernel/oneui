import * as React from 'react';
import { Select } from '@textkernel/oneui';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../src/components/AutosuggestDeprecated/__mocks__/suggestions';

type TSuggestion = { name: string };

export default {
    title: 'Organisms/Select Components/Select',
    component: Select,
};

export const _Select = (args) => {
    const [selectedItem, setSelectedItem] = React.useState<TSuggestion>(SUGGESTIONS[0]);

    const onChange = (item) => {
        console.log(`onChange was called with {name: ${item.name}}`);
        setSelectedItem(item);
    };

    return <Select<TSuggestion> {...args} selectedItem={selectedItem} onChange={onChange} />;
};
_Select.args = {
    style: { width: '650px' },
    items: SUGGESTIONS,
    itemToString: SUGGESTION_TO_STRING,
    onClear: undefined,
};

export const Clearable = (args) => {
    const [selectedItem, setSelectedItem] = React.useState<TSuggestion | undefined>(SUGGESTIONS[0]);

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
};
Clearable.args = {
    style: { width: '650px' },
    items: SUGGESTIONS,
    itemToString: SUGGESTION_TO_STRING,
    clearTooltipLabel: 'Clear',
    placeholder: 'Choose item...',
};
