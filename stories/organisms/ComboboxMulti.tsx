import * as React from 'react';
import { ComboboxMulti } from '@textkernel/oneui';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../src/constants/suggestions';

type TSuggestion = { name: string };

export default {
    title: 'Organisms/Select Components/ComboboxMulti',
    component: ComboboxMulti,
};

export const _ComboboxMulti = (args) => {
    const [selectedSuggestions, setSelectedSuggestions] = React.useState<TSuggestion[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [disabled, setDisabled] = React.useState(false);

    const getSuggestions = (): TSuggestion[] => {
        return SUGGESTIONS.filter(
            (item) =>
                !selectedSuggestions.includes(item) &&
                item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        );
    };

    const onInputValueChange = (value: string) => {
        console.log(`onInputValueChange was called with ${value}`);
        setInputValue(value);
    };

    const onSelectionAdd = (item: TSuggestion) => {
        console.log(`onSelectionAdd was called with {name: ${item?.name}}`);
        setSelectedSuggestions([...selectedSuggestions, item]);
        if (selectedSuggestions.length === SUGGESTIONS.length) {
            setDisabled(true);
        }
    };

    const onFocus = () => {
        console.log('onFocus was called');
    };

    const onBlur = () => {
        console.log('onBlur was called');
        setTimeout(() => setInputValue(''), 200);
    };

    return (
        <>
            <ul>
                {selectedSuggestions.map((item) => (
                    <li key={item.name}>{item.name}</li>
                ))}
            </ul>
            <ComboboxMulti<TSuggestion>
                {...args}
                suggestions={getSuggestions()}
                onFocus={onFocus}
                onBlur={onBlur}
                onSelectionAdd={onSelectionAdd}
                onInputValueChange={onInputValueChange}
                disabled={args.disabled || disabled}
            />
        </>
    );
};
_ComboboxMulti.args = {
    style: { width: '650px' },
    useOptimizeListRender: false,
    inputPlaceholder: 'Select something...',
    noSuggestionsPlaceholder: 'No suggestions found...',
    suggestionToString: SUGGESTION_TO_STRING,
};
