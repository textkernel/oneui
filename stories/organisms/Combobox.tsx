import * as React from 'react';
import { Combobox } from '@textkernel/oneui';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../src/components/AutosuggestDeprecated/__mocks__/suggestions';

type TSuggestion = { name: string };

export default {
    title: 'Organisms/Select Components/Combobox',
    component: Combobox,
};

export const _Combobox = (args) => {
    const [selectedSuggestion, setSelectedSuggestion] = React.useState<TSuggestion | undefined>();
    const [inputValue, setInputValue] = React.useState('');

    const getSuggestions = (): TSuggestion[] => {
        return SUGGESTIONS.filter((item) =>
            item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        );
    };

    const onInputValueChange = (value: string) => {
        console.log(`onInputValueChange was called with ${value}`);
        setInputValue(value);
    };

    const onSelectionAdd = (item: TSuggestion) => {
        console.log(`onSelectionAdd was called with {name: ${item?.name}}`);
        setSelectedSuggestion(item);
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
            <Combobox<TSuggestion>
                {...args}
                suggestions={getSuggestions()}
                selectedSuggestion={selectedSuggestion}
                onFocus={onFocus}
                onBlur={onBlur}
                onSelectionAdd={onSelectionAdd}
                onInputValueChange={onInputValueChange}
            />
        </>
    );
};
_Combobox.args = {
    style: { width: '650px' },
    useOptimizeListRender: false,
    inputPlaceholder: 'Select something...',
    noSuggestionsPlaceholder: 'No suggestions found...',
    suggestionToString: SUGGESTION_TO_STRING,
};
_Combobox.storyName = 'Combobox';

export const Clearable = (args) => {
    const [selectedSuggestion, setSelectedSuggestion] = React.useState<TSuggestion | undefined>();
    const [inputValue, setInputValue] = React.useState('');

    const getSuggestions = (): TSuggestion[] => {
        return SUGGESTIONS.filter((item) =>
            item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        );
    };

    const onInputValueChange = (value: string) => {
        console.log(`onInputValueChange was called with ${value}`);
        setInputValue(value);
    };

    const onSelectionAdd = (item: TSuggestion) => {
        console.log(`onSelectionAdd was called with {name: ${item?.name}}`);
        setSelectedSuggestion(item);
    };

    const onFocus = () => {
        console.log('onFocus was called');
    };

    const onBlur = () => {
        console.log('onBlur was called');
        setTimeout(() => setInputValue(''), 200);
    };

    const onClear = () => {
        setSelectedSuggestion(undefined);
    };

    return (
        <>
            <Combobox<TSuggestion>
                {...args}
                suggestions={getSuggestions()}
                selectedSuggestion={selectedSuggestion}
                onFocus={onFocus}
                onBlur={onBlur}
                onSelectionAdd={onSelectionAdd}
                onInputValueChange={onInputValueChange}
                onClearAllSelected={onClear}
                showClearButton={!!selectedSuggestion}
            />
        </>
    );
};
Clearable.args = {
    style: { width: '650px' },
    useOptimizeListRender: false,
    inputPlaceholder: 'Select something...',
    noSuggestionsPlaceholder: 'No suggestions found...',
    suggestionToString: SUGGESTION_TO_STRING,
    clearTitle: 'Clear',
};
Clearable.storyName = 'Clearable Combobox';

export const FreeInput = (args) => {
    const [selectedSuggestion, setSelectedSuggestion] = React.useState<TSuggestion | undefined>();
    const [inputValue, setInputValue] = React.useState('');

    const getSuggestions = (): TSuggestion[] => {
        const filtered = SUGGESTIONS.filter((item) =>
            item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
        );
        const shouldShowInput =
            inputValue &&
            !filtered.some((item) => item.name.toLowerCase() === inputValue.toLowerCase());
        return shouldShowInput ? [{ name: inputValue }, ...filtered] : filtered;
    };

    const onInputValueChange = (value: string) => {
        console.log(`onInputValueChange was called with ${value}`);
        setInputValue(value);
        if (selectedSuggestion) {
            setSelectedSuggestion(undefined);
        }
    };

    const onSelectionAdd = (item: TSuggestion) => {
        console.log(`onSelectionAdd was called with {name: ${item?.name}}`);
        setSelectedSuggestion(item);
        setInputValue('');
    };

    const onOuterClick = () => {
        console.log('onOuterClick was called');
        if (inputValue) {
            setSelectedSuggestion({ name: inputValue });
            setInputValue('');
        }
    };

    const onFocus = () => {
        console.log('onFocus was called');
    };

    const onBlur = () => {
        console.log('onBlur was called');
        setTimeout(() => setInputValue(''), 200);
    };

    const onClear = () => {
        console.log('onClear was called');
        setSelectedSuggestion(undefined);
    };

    return (
        <>
            <Combobox<TSuggestion>
                {...args}
                suggestions={getSuggestions()}
                selectedSuggestion={selectedSuggestion}
                onFocus={onFocus}
                onBlur={onBlur}
                onSelectionAdd={onSelectionAdd}
                onInputValueChange={onInputValueChange}
                onClearAllSelected={onClear}
                onOuterClick={onOuterClick}
                showClearButton={!!selectedSuggestion}
            />
        </>
    );
};
FreeInput.args = {
    style: { width: '650px' },
    useOptimizeListRender: false,
    inputPlaceholder: 'Select something...',
    noSuggestionsPlaceholder: 'No suggestions found...',
    suggestionToString: SUGGESTION_TO_STRING,
    clearTitle: 'Clear',
};
FreeInput.storyName = 'Combobox with free input';
