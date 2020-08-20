import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { ComboboxMulti, AutosuggestMulti, Select } from '@textkernel/oneui';
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

storiesOf('Organisms|Select Components', module)
    .addDecorator(withKnobs)
    .addParameters(
        StoreInjector.withStore({
            inputValue: '',
            selectedSuggestions: [],
            selectedItem: SUGGESTIONS[0],
        })
    )
    .add(
        'Select',
        (storyContext) => {
            const store = storyContext?.parameters.getStore();
            const onFocus = () => {
                console.log('onFocus was called');
            };

            const onBlur = () => {
                console.log('onBlur was called');
            };

            const onChange = (item) => {
                console.log(`onChange was called with {name: ${item.name}}`);
                store.set({ selectedItem: item });
            };

            return (
                <>
                    <Select<TSuggestion>
                        style={{ width: '650px' }}
                        items={SUGGESTIONS}
                        itemToString={SUGGESTION_TO_STRING}
                        selectedItem={store.get('selectedItem')}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                </>
            );
        },
        {
            info: {
                text: `
        ## Usage information
        This component is recommended to use for a simple select component with static known list of values without a need for filtering.
        The list is shown right away by clicking on the control. The selected item is shown in the top field.

        More detailed face-to-face comparison of Select components can be found [here](https://docs.google.com/spreadsheets/d/1VyYR54RpNaPWLBXOoBPkFEkmzLS_LfEEGdm1ZTTOcHU/edit#gid=0)`,
            },
        }
    )
    .add(
        'ComboboxMulti',
        (storyContext) => {
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

            const onSelectionAdd = (item: TSuggestion) => {
                console.log(`onSelectionAdd was called with {name: ${item?.name}}`);
                store.set({ selectedSuggestions: [...store.get('selectedSuggestions'), item] });
            };

            const onFocus = () => {
                console.log('onFocus was called');
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
                        inputPlaceholder={text('Input placeholder', 'Select something...')}
                        noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
                        suggestions={getSuggestions()}
                        suggestionToString={SUGGESTION_TO_STRING}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSelectionAdd={onSelectionAdd}
                        onInputValueChange={onInputValueChange}
                        isProminent={boolean('Use prominent styling', false)}
                    />
                </>
            );
        },
        {
            info: {
                text: `
            ## Usage information
            This component is recommended to use when there's a static known list of values.
            The list is shown right away by clicking on the control. Selected components get rendered above the component outside of the main input.

            More detailed face-to-face comparison of Select components can be found [here](https://docs.google.com/spreadsheets/d/1VyYR54RpNaPWLBXOoBPkFEkmzLS_LfEEGdm1ZTTOcHU/edit#gid=0)`,
            },
        }
    )
    // eslint-disable-next-line
    .add(
        'AutosuggestMulti',
        ({ parameters }: any) => {
            const store = parameters.getStore();
            searchFor.name = `Search for "${store.get('inputValue')}"`;
            searchFor.value = store.get('inputValue');
            const getSuggestions = (): TSuggestion[] => {
                const suggestions = SUGGESTIONS.filter(
                    (item: TSuggestion) =>
                        item.name.toLocaleLowerCase() !==
                            store.get('inputValue').toLocaleLowerCase() &&
                        item.name
                            .toLocaleLowerCase()
                            .includes(store.get('inputValue').toLocaleLowerCase()) &&
                        !store
                            .get('selectedSuggestions')
                            .some(
                                (i) => item.name.toLocaleLowerCase() === i.name.toLocaleLowerCase()
                            )
                );
                if (store.get('inputValue').length) {
                    return [searchFor, ...suggestions];
                }
                return suggestions;
            };

            const onInputValueChange = (value: string) => {
                console.log(`onInputValueChange was called with ${value}`);
                store.set({ inputValue: value });
            };

            const onSelectionAdd = (item: TSuggestion) => {
                console.log(`onSelectionAdd was called with {name: ${item.name}}`);
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
                store.set({ inputValue: '' });
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

            const onFocus = () => {
                console.log('onFocus was called');
            };

            const onSubmit = () => {
                console.log('onSubmit was called');
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
                        onFocus={onFocus}
                        onSubmit={onSubmit}
                        isFirstItemAlwaysVisible={
                            boolean('First item is always visible', false) &&
                            !!store.get('inputValue').length
                        }
                        onSelectionAdd={onSelectionAdd}
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
        },
        {
            info: {
                text: `
            ## Usage information
            This component is recommended to use for a dynamic list of values.
            The list of suggestions is shown once there's a value inside the input.

            More detailed face-to-face comparison of Select components can be found [here](https://docs.google.com/spreadsheets/d/1VyYR54RpNaPWLBXOoBPkFEkmzLS_LfEEGdm1ZTTOcHU/edit#gid=0)`,
            },
        }
    );
