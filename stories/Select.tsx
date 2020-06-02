import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { ComboboxMulti, AutosuggestMulti } from '@textkernel/oneui';
import { StoreInjector } from '../src/packages/storybook/withStore';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../src/components/Autosuggest/__mocks__/suggestions';

type TSuggestion = { name: string };

const searchFor = {
    name: '',
    value: '',
};

storiesOf('Organisms|Select', module)
    .addDecorator(withKnobs)
    .addParameters(
        StoreInjector.withStore({
            inputValue: '',
            selectedSuggestions: [],
        })
    )
    .add('ComboboxMulti', (storyContext) => {
        const store = storyContext?.parameters.getStore();
        const getSuggestions = (): TSuggestion[] => {
            return SUGGESTIONS.filter(
                (item) =>
                    !store.get('selectedSuggestions').includes(item) &&
                    item.name
                        .toLocaleLowerCase()
                        .includes(store.get('inputValue').toLocaleLowerCase())
            );
        };

        const onInputValueChange = (value: string) => {
            console.log(`onInputValueChange was called with ${value}`);
            store.set({ inputValue: value });
        };

        const onSelectionChange = (item: TSuggestion) => {
            console.log(`onSelectionChange was called with {name: ${item?.name}}`);
            store.set({ selectedSuggestions: [...store.get('selectedSuggestions'), item] });
        };

        const onBlur = () => {
            console.log('onBlur was called');
            setTimeout(() => store.set({ inputValue: '' }), 200);
        };

        return (
            <>
                <ul>
                    {store.get('selectedSuggestions').map((item) => (
                        <li key={item.name}>{item.name}</li>
                    ))}
                </ul>
                <ComboboxMulti<TSuggestion>
                    style={{ width: '650px' }}
                    useOptimizeListRender={boolean(
                        'Use optimize list render (ListOptimizer)',
                        false
                    )}
                    isLoading={boolean('isLoading', false)}
                    inputPlaceholder={text('Input placeholder', 'Select something...')}
                    noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
                    suggestions={getSuggestions()}
                    suggestionToString={SUGGESTION_TO_STRING}
                    onBlur={onBlur}
                    onSelectionChange={onSelectionChange}
                    onInputValueChange={onInputValueChange}
                />
            </>
        );
    })
    // eslint-disable-next-line
    .add('AutosuggestMulti', ({ parameters }: any) => {
        const store = parameters.getStore();
        searchFor.name = `Search for "${store.get('inputValue')}"`;
        searchFor.value = store.get('inputValue');
        const getSuggestions = (): TSuggestion[] => {
            if (!store.get('inputValue').length) return [];
            const suggestions = SUGGESTIONS.filter(
                (item: TSuggestion) =>
                    !store
                        .get('selectedSuggestions')
                        .some((sug: TSuggestion) => sug.name === item.name)
            ).filter((item: TSuggestion) =>
                item.name.toLocaleLowerCase().includes(store.get('inputValue').toLocaleLowerCase())
            );
            return [searchFor, ...suggestions];
        };

        const onInputValueChange = (value: string) => {
            console.log(`onInputValueChange was called with ${value}`);
            store.set({ inputValue: value });
        };

        const onSelectionChange = (item: TSuggestion) => {
            console.log(`onSelectionChange was called with {name: ${item.name}}`);
            let selectedItem = { ...item };
            if (item === searchFor) {
                selectedItem = { name: (item as typeof searchFor).value };
            }
            // Add new item
            if (
                !store
                    .get('selectedSuggestions')
                    .some((i: TSuggestion) => i.name === selectedItem.name)
            ) {
                const selectedSuggestions = [...store.get('selectedSuggestions'), selectedItem];
                store.set({
                    selectedSuggestions,
                });
            }
        };

        const onSelectionRemove = (item: TSuggestion) => {
            console.log(`onSelectionRemove was called with {name: ${item.name}}`);
            const selectedItem = { ...item };
            // Delete item
            if (!store.get('inputValue')) {
                const selectedSuggestions = store
                    .get('selectedSuggestions')
                    .filter((i: TSuggestion) => i.name !== selectedItem.name);
                store.set({
                    selectedSuggestions,
                });
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
            <div style={{ width: '500px' }}>
                <AutosuggestMulti
                    id="test"
                    selectedSuggestions={store.get('selectedSuggestions')}
                    inputPlaceholder={text('Input placeholder', 'Select something...')}
                    suggestions={getSuggestions()}
                    suggestionToString={SUGGESTION_TO_STRING}
                    onBlur={onBlur}
                    onSelectionChange={onSelectionChange}
                    onSelectionRemove={onSelectionRemove}
                    isProminent={boolean('Use prominent styling', true)}
                    isLoading={boolean('isLoading', false)}
                    onInputValueChange={onInputValueChange}
                    showClearButton={boolean('Show clear button', true)}
                    clearTitle={text('Clear button label', 'Clear')}
                    onClearAllSelected={onClearAllSelected}
                />
            </div>
        );
    });
