import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { Autosuggest, IconMatch } from '@textkernel/oneui';
import { StoreInjector } from '../src/packages/storybook/withStore';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../src/components/Autosuggest/__mocks__/suggestions';

const { withStore } = StoreInjector;

storiesOf('Organisms|Autosuggest - old', module)
    .addDecorator(withKnobs)
    .addParameters(
        withStore({
            selectedSuggestions: [],
            inputValue: '',
        })
    )
    .add(
        'Single select with icon',
        () => (
            <Autosuggest
                getSuggestions={() => SUGGESTIONS}
                suggestionToString={SUGGESTION_TO_STRING}
                isLoading={boolean('Loading', false)}
                inputPlaceholder={text('Input placeholder', 'Select something...')}
                noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
                clearTitle={text('Remove button label', 'Clear')}
                onBlur={() => console.log('onBlur was called')}
                onSelectionChange={(item) =>
                    console.log(`onSelectionChange was called with ${item.name} object`)
                }
                onInputValueChange={(value) =>
                    console.log(`onInputValueChange was called with ${value}`)
                }
                saveSelectedValueToInput={boolean('Save selected value', false)}
                onClearAllSelected={() => console.log('onClearAllSelected was called')}
                showClearButton={boolean('Show clear button', true)}
                iconNode={<IconMatch />}
                isProminent={boolean('Use prominent styling', true)}
                style={{ width: '650px' }}
            />
        ),
        {
            info: {
                text: `
    ## Usage information
    This component uses old internal implementation and **will be deprecated** in the future. Use components listed under Select Components instead`,
            },
        }
    )
    .add(
        'Multiselect',
        () => (
            <Autosuggest
                selectedSuggestions={SUGGESTIONS.slice(2, 4)}
                getSuggestions={() => SUGGESTIONS}
                suggestionToString={SUGGESTION_TO_STRING}
                isLoading={boolean('Loading', false)}
                selectedPlaceholder={text('Placeholder for selected items', 'Some objects')}
                inputPlaceholder={text('Input placeholder', 'Select something...')}
                noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
                clearTitle={text('Remove button label', 'Clear')}
                onBlur={() => console.log('onBlur was called')}
                onSelectionChange={(item) =>
                    console.log(`onSelectionChange was called with "${item.name}" object`)
                }
                onInputValueChange={(value) =>
                    console.log(`onInputValueChange was called with ${value}`)
                }
                onClearAllSelected={() => console.log('onClearAllSelected was called')}
                showClearButton={boolean('Show clear button', true)}
                isMultiselect={boolean('Multiselect mode', true)}
                isProminent={boolean('Use prominent styling', true)}
                style={{ width: '650px' }}
            />
        ),
        {
            info: {
                text: `
    ## Usage information
    This component uses old internal implementation and **will be deprecated** in the future. Use components listed under Select Components instead`,
            },
        }
    )
    .add(
        'Example implementation',
        ({ parameters }) => {
            const store = parameters.getStore();
            const getSuggestions = () => {
                if (!store.get('inputValue').length) return [];
                return SUGGESTIONS.filter(
                    (item) => !store.get('selectedSuggestions').includes(item)
                ).filter((item) =>
                    item.name
                        .toLocaleLowerCase()
                        .includes(store.get('inputValue').toLocaleLowerCase())
                );
            };

            const onInputValueChange = (value) => {
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

                return `${SUGGESTION_TO_STRING(store.get('selectedSuggestions')[0])} + ${
                    numOfItems - 1
                } more`;
            };

            const onSelectionChange = (item) => {
                console.log(`onSelectionChange was called with {name: ${item.name}}`);
                if (store.get('selectedSuggestions').includes(item)) {
                    const newSelection = store
                        .get('selectedSuggestions')
                        .filter((el) => el.name !== item.name);
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
                <Autosuggest
                    style={{ width: '650px' }}
                    selectedSuggestions={
                        boolean('Add selectedSuggestions', true)
                            ? store.get('selectedSuggestions')
                            : undefined
                    }
                    selectedPlaceholder={
                        boolean('Add selectionPlaceholder', true)
                            ? getSelectedPlaceholder()
                            : undefined
                    }
                    isLoading={boolean('Loading', false)}
                    showClearButton={boolean('Show clear button', true)}
                    isMultiselect={boolean('Multiselect', true)}
                    iconNode={boolean('Add iconNode', false) ? <IconMatch /> : undefined}
                    isProminent={boolean('Use prominent styling', true)}
                    inputPlaceholder={text('Input placeholder', 'Select something...')}
                    noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
                    clearTitle={text('Remove button label', 'Clear')}
                    getSuggestions={getSuggestions}
                    suggestionToString={SUGGESTION_TO_STRING}
                    onBlur={onBlur}
                    onSelectionChange={onSelectionChange}
                    onClearAllSelected={onClearAllSelected}
                    onInputValueChange={onInputValueChange}
                />
            );
        },
        {
            info: {
                text: `
    ## Usage information
    This component uses old internal implementation and **will be deprecated** in the future. Use components listed under Select Components instead`,
            },
        }
    );
