import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { ComboboxMulti } from '@textkernel/oneui';
import { StoreInjector } from '../src/packages/storybook/withStore';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../src/components/Autosuggest/__mocks__/suggestions';

type TSuggestion = { name: string };

storiesOf('Organisms|Select', module)
    .addDecorator(withKnobs)
    .addParameters(
        StoreInjector.withStore({
            inputValue: '',
        })
    )
    .add('ComboboxMulti', ({ parameters }) => {
        const store = parameters.getStore();
        const getSuggestions = (): TSuggestion[] => {
            return SUGGESTIONS.filter(item =>
                item.name.toLocaleLowerCase().includes(store.get('inputValue').toLocaleLowerCase())
            );
        };

        const onInputValueChange = (value: string) => {
            console.log(`onInputValueChange was called with ${value}`);
            store.set({ inputValue: value });
        };

        const onSelectionChange = (item: TSuggestion) => {
            console.log(`onSelectionChange was called with {name: ${item?.name}}`);
        };

        const onBlur = () => {
            console.log('onBlur was called');
            store.set({ inputValue: '' });
        };

        const onClearAllSelected = () => {
            console.log('onClearAllSelected was called');
        };

        return (
            <ComboboxMulti<TSuggestion>
                style={{ width: '650px' }}
                inputPlaceholder={text('Input placeholder', 'Select something...')}
                noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
                suggestions={getSuggestions()}
                suggestionToString={SUGGESTION_TO_STRING}
                onBlur={onBlur}
                onSelectionChange={onSelectionChange}
                onClearAllSelected={onClearAllSelected}
                onInputValueChange={onInputValueChange}
            />
        );
    });
