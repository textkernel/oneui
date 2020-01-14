import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { AutosuggestMulti, SimpleSelect } from '@textkernel/oneui';
import withStore from '../src/packages/storybook/withStore';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../src/components/Autosuggest/__mocks__/suggestions';

storiesOf('Organisms|Select', module)
    .addDecorator(withKnobs)
    .addParameters(
        withStore({
            selectedSuggestions: [],
            inputValue: '',
            selectedSuggestion: null,
        })
    )
    .add('Simple select', ({ parameters }) => {
        const store = parameters.getStore();
        const getSuggestions = () => {
            return SUGGESTIONS.filter(item =>
                item.name.toLocaleLowerCase().includes(store.get('inputValue').toLocaleLowerCase())
            );
        };

        const onInputValueChange = value => {
            console.log(`onInputValueChange was called with ${value}`);
            store.set({ inputValue: value });
        };

        const onSelectionChange = item => {
            console.log(`onSelectionChange was called with {name: ${item?.name}}`);
            if (store.get('selectedSuggestion')?.name === item.name) {
                store.set({ selectedSuggestion: null });
            } else {
                store.set({ selectedSuggestion: item });
            }
        };

        const onBlur = () => {
            console.log('onBlur was called');
            store.set({ inputValue: '' });
        };

        const onClearAllSelected = () => {
            console.log('onClearAllSelected was called');
            store.set({ selectedSuggestion: null });
        };

        return (
            <SimpleSelect
                style={{ width: '650px' }}
                selectedSuggestion={store.get('selectedSuggestion')}
                inputPlaceholder={text('Input placeholder', 'Select something...')}
                noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
                clearTitle={text('Remove button label', 'Clear')}
                suggestions={getSuggestions()}
                suggestionToString={SUGGESTION_TO_STRING}
                onBlur={onBlur}
                onSelectionChange={onSelectionChange}
                onClearAllSelected={onClearAllSelected}
                onInputValueChange={onInputValueChange}
            />
        );
    })
    .add('Autosuggest multi select', ({ parameters }) => {
        const store = parameters.getStore();
        const getSuggestions = () => {
            if (!store.get('inputValue').length) return [];
            return SUGGESTIONS.filter(
                item => !store.get('selectedSuggestions').includes(item)
            ).filter(item =>
                item.name.toLocaleLowerCase().includes(store.get('inputValue').toLocaleLowerCase())
            );
        };

        const onInputValueChange = value => {
            console.log(`onInputValueChange was called with ${value}`);
            store.set({ inputValue: value });
        };

        const getSelectedPlaceholder = () => {
            const numOfItems = store.get('selectedSuggestions').length;
            if (!numOfItems) {
                return '';
            }

            if (numOfItems === 1) {
                return SUGGESTION_TO_STRING(store.get('selectedSuggestions')[0]);
            }

            return `${SUGGESTION_TO_STRING(store.get('selectedSuggestions')[0])} + ${numOfItems -
                1} more`;
        };

        const onSelectionChange = item => {
            console.log(`onSelectionChange was called with {name: ${item.name}}`);
            if (store.get('selectedSuggestions').includes(item)) {
                const newSelection = store
                    .get('selectedSuggestions')
                    .filter(el => el.name !== item.name);
                store.set({ selectedSuggestions: newSelection });
            } else {
                store.set({ selectedSuggestions: [...store.get('selectedSuggestions'), item] });
            }
        };

        const onBlur = () => {
            console.log('onBlur was called');
            store.set({ inputValue: '' });
        };

        const onClearAllSelected = () => {
            console.log('onClearAllSelected was called');
            store.set({ selectedSuggestions: [] });
        };

        return (
            <AutosuggestMulti
                style={{ width: '650px' }}
                selectedSuggestions={
                    boolean('Add selectedSuggestions', true)
                        ? store.get('selectedSuggestions')
                        : undefined
                }
                selectedPlaceholder={
                    boolean('Add selectionPlaceholder', true) ? getSelectedPlaceholder() : undefined
                }
                isProminent={boolean('Prominent styling', false)}
                isLoading={boolean('Loading', false)}
                showClearButton={boolean('Show clear button', true)}
                inputPlaceholder={text('Input placeholder', 'Select something...')}
                noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
                clearTitle={text('Remove button label', 'Clear')}
                suggestions={getSuggestions()}
                suggestionToString={SUGGESTION_TO_STRING}
                onBlur={onBlur}
                onSelectionChange={onSelectionChange}
                onClearAllSelected={onClearAllSelected}
                onInputValueChange={onInputValueChange}
            />
        );
    });
