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
                inputValue={inputValue}
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
