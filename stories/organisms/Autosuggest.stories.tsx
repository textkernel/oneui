import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Autosuggest, AutosuggestProps } from '@textkernel/oneui';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
    COMPLEX_SUGGESTIONS,
} from '@textkernel/oneui/components/SelectComponents/Autosuggest/__mocks__/suggestions';

type TSuggestion = { name: string };
type TComplexSuggestion = { name: string; type: string };

const searchFor = {
    name: '',
    value: '',
};

const meta: Meta<typeof Autosuggest> = {
    title: 'Organisms/Select Components/Autosuggest',
    component: Autosuggest,
};

export default meta;

type HasSuggestionType = {
    hasSuggestions: boolean;
};
type Story = StoryObj<typeof Autosuggest | HasSuggestionType>;

export const Multiselect: Story = {
    name: 'Autosuggest as multi-select component',
    args: {
        id: 'test',
        inputPlaceholder: 'Select something...',
        suggestionToString: SUGGESTION_TO_STRING,
        isLoading: false,
        showClearButton: true,
        clearTitle: 'Clear',
        noSuggestionsPlaceholder: 'No suggestions',
        hasSuggestions: true,
    },
    render: ({ hasSuggestions, ...args }) => {
        const [selectedSuggestions, setSelectedSuggestions] = React.useState<TSuggestion[]>([]);

        const getSuggestions = (): TSuggestion[] => {
            const suggestions = SUGGESTIONS.filter(
                (item: TSuggestion) =>
                    !selectedSuggestions.some(
                        (i) => item.name.toLocaleLowerCase() === i.name.toLocaleLowerCase()
                    )
            );
            return suggestions;
        };

        const onSelectionAdd = (item: TSuggestion) => {
            console.log(`onSelectionAdd was called with {name: ${item.name}}`);
            const selectedItem = { ...item };
            // Add new item
            if (!selectedSuggestions.some((i: TSuggestion) => i.name === selectedItem.name)) {
                setSelectedSuggestions([...selectedSuggestions, selectedItem]);
            }
        };

        const onSelectionRemove = (item: TSuggestion) => {
            console.log(`onSelectionRemove was called with {name: ${item.name}}`);
            // Delete item
            setSelectedSuggestions(
                selectedSuggestions.filter((i: TSuggestion) => i.name !== item.name)
            );
        };

        const onClearAllSelected = () => {
            console.log('onClearAllSelected was called');
            setSelectedSuggestions([]);
        };

        return (
            <div style={{ width: '500px' }}>
                <Autosuggest
                    {...(args as AutosuggestProps<TSuggestion>)}
                    selectedSuggestions={selectedSuggestions}
                    suggestions={hasSuggestions ? getSuggestions() : []}
                    onSelectionAdd={onSelectionAdd}
                    onSelectionRemove={onSelectionRemove}
                    onClearAllSelected={onClearAllSelected}
                    shouldRenderWithPortal
                />
            </div>
        );
    },
};

/**
 * This story demonstrates how you can add props and function to make it feel like a single select component.
 * The important parts here are:
 * * passing inputRef prop, so we can access the input field from outside
 * * calling inputRef.current.blur() in onSelectionAdd
 * * when something was selected, passing a custom customSelectionIndicator node to
 * alter the look and feel of the blurred component
 * * passing initInputValue so that the input field gets populated when the component receives focus again.
 */
export const SingleSelect: Story = {
    name: 'Autosuggest as single-select component',
    args: {
        id: 'test',
        inputPlaceholder: 'Select something...',
        suggestionToString: SUGGESTION_TO_STRING,
        isLoading: false,
        showClearButton: true,
        clearTitle: 'Clear',
        hasSuggestions: true,
    },
    render: ({ hasSuggestions, ...args }) => {
        const [inputValue, setInputValue] = React.useState('');
        const [singleSelectedText, setSingleSelectedText] = React.useState('');

        const inputRef = React.createRef<HTMLInputElement>();

        const getSuggestions = (): TSuggestion[] =>
            // filtering suggestions from some other source
            SUGGESTIONS.filter((item: TSuggestion) =>
                // suggestion is relevant to input
                item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
            );
        const onInputValueChange = (value: string) => {
            console.log(`onInputValueChange was called with ${value}`);
            setInputValue(value);
        };

        // most of the magic is happening here
        const onSelectionAdd = (item: TSuggestion) => {
            console.log(`onSelectionAdd was called with {name: ${item.name}}`);
            setSingleSelectedText(item.name);
            // Force UI behavior to single select - blur the field
            inputRef.current?.blur();
        };

        const onBlur = () => {
            console.log('onBlur was called');
            // inputValue is used to filter suggestions,
            // preserve it for free text selection, but not otherwise
            setInputValue(singleSelectedText || '');
        };

        const onClearAllSelected = () => {
            console.log('onClearAllSelected was called');
            setSingleSelectedText('');
        };

        // Other magical prop -> will overwrite standard blurred render UI
        const customBlur = (
            <div
                style={{
                    alignSelf: 'center',
                    marginLeft: '6px',
                }}
            >
                {singleSelectedText}
            </div>
        );

        return (
            <div style={{ width: '500px' }}>
                <Autosuggest
                    {...(args as AutosuggestProps<TSuggestion>)}
                    suggestions={hasSuggestions ? getSuggestions() : []}
                    onBlur={onBlur}
                    onInputValueChange={onInputValueChange}
                    onSelectionAdd={onSelectionAdd}
                    onClearAllSelected={onClearAllSelected}
                    inputRef={inputRef}
                    // this will trick to UI to pre-fill the in input field when it gets focused again
                    initInputValue={singleSelectedText}
                    // Here we overwrite the UI default look when we have a selection
                    customSelectionIndicator={singleSelectedText ? customBlur : undefined}
                />
            </div>
        );
    },
};

/**
 * This story demonstrates how you can apply a custom render function to adjust the look and feel of the suggestions
 */
export const CustomRender: Story = {
    name: 'Autosuggest with custom item renderer',
    args: {
        id: 'test',
        inputPlaceholder: 'Select something...',
        suggestionToString: SUGGESTION_TO_STRING,
        isLoading: false,
        showClearButton: true,
        clearTitle: 'Clear',
        noSuggestionsPlaceholder: 'No suggestions',
    },
    render: (args) => {
        const [selectedSuggestions, setSelectedSuggestions] = React.useState<TComplexSuggestion[]>(
            []
        );

        const getSuggestions = (): TComplexSuggestion[] => {
            const suggestions = COMPLEX_SUGGESTIONS.filter(
                (item: TComplexSuggestion) =>
                    !selectedSuggestions.some(
                        (i) => item.name.toLocaleLowerCase() === i.name.toLocaleLowerCase()
                    )
            );
            return suggestions;
        };

        const onSelectionAdd = (item: TComplexSuggestion) => {
            console.log(`onSelectionAdd was called with {name: ${item.name}}`);
            const selectedItem = { ...item };
            // Add new item
            if (
                !selectedSuggestions.some((i: TComplexSuggestion) => i.name === selectedItem.name)
            ) {
                setSelectedSuggestions([...selectedSuggestions, selectedItem]);
            }
        };

        const onSelectionRemove = (item: TComplexSuggestion) => {
            console.log(`onSelectionRemove was called with {name: ${item.name}}`);
            // Delete item
            setSelectedSuggestions(
                selectedSuggestions.filter((i: TComplexSuggestion) => i.name !== item.name)
            );
        };

        const onClearAllSelected = () => {
            console.log('onClearAllSelected was called');
            setSelectedSuggestions([]);
        };

        const suggestionRenderer = (
            item: TComplexSuggestion | null,
            i: number,
            array: TComplexSuggestion[]
        ) => {
            if (!item) {
                return null;
            }
            if (i === 0 || item.type !== array[i - 1].type) {
                return (
                    <div
                        style={{
                            borderTop: '1px solid var(--color-neutral-30)',
                            width: '100%',
                            margin: '-12px',
                            padding: '12px',
                        }}
                    >
                        {item.name}
                        <span style={{ color: 'grey', marginLeft: '6px' }}>{`- ${item.type}`}</span>
                    </div>
                );
            }

            return <div>{item.name}</div>;
        };

        return (
            <div style={{ width: '500px' }}>
                <Autosuggest
                    {...args}
                    selectedSuggestions={selectedSuggestions}
                    suggestions={getSuggestions()}
                    suggestionItemRenderer={suggestionRenderer}
                    onSelectionAdd={onSelectionAdd}
                    onSelectionRemove={onSelectionRemove}
                    onClearAllSelected={onClearAllSelected}
                />
            </div>
        );
    },
};

/**
 * This story demonstrates how you can mix these dynamic suggestions with static ones (e.g. based on user input),
 * and how those can be shown during the loading state as well
 */
export const MixedSuggestions: Story = {
    name: 'Autosuggest with selecting input as free text',
    args: {
        id: 'test',
        inputPlaceholder: 'Select something...',
        suggestionToString: SUGGESTION_TO_STRING,
        isLoading: false,
        showClearButton: true,
        clearTitle: 'Clear',
    },
    render: (args) => {
        const [selectedSuggestions, setSelectedSuggestions] = React.useState<TSuggestion[]>([]);
        const [inputValue, setInputValue] = React.useState('');

        searchFor.name = `Search for "${inputValue}"`;
        searchFor.value = inputValue;

        const getSuggestions = (): TSuggestion[] => {
            const suggestions = SUGGESTIONS.filter(
                (item: TSuggestion) =>
                    item.name.toLocaleLowerCase() !== inputValue.toLocaleLowerCase() &&
                    item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) &&
                    !selectedSuggestions.some(
                        (i) => item.name.toLocaleLowerCase() === i.name.toLocaleLowerCase()
                    )
            );
            if (inputValue.length) {
                return [searchFor, ...suggestions];
            }
            return suggestions;
        };

        const onInputValueChange = (value: string) => {
            console.log(`onInputValueChange was called with ${value}`);
            setInputValue(value);
        };

        const onSelectionAdd = (item: TSuggestion) => {
            console.log(`onSelectionAdd was called with {name: ${item.name}}`);
            let selectedItem = { ...item };
            if (item === searchFor) {
                selectedItem = { name: (item as typeof searchFor).value };
            }
            // Add new item
            if (!selectedSuggestions.some((i: TSuggestion) => i.name === selectedItem.name)) {
                setSelectedSuggestions([...selectedSuggestions, selectedItem]);
            }
        };

        const onSelectionRemove = (item: TSuggestion) => {
            console.log(`onSelectionRemove was called with {name: ${item.name}}`);
            setInputValue('');
            const selectedItem = { ...item };
            // Delete item
            if (!inputValue) {
                setSelectedSuggestions(
                    selectedSuggestions.filter((i: TSuggestion) => i.name !== selectedItem.name)
                );
            }
        };

        const onBlur = () => {
            console.log('onBlur was called');
            setInputValue('');
        };

        const onClearAllSelected = () => {
            console.log('onClearAllSelected was called');
            setSelectedSuggestions([]);
        };

        return (
            <div style={{ width: '500px' }}>
                <Autosuggest
                    {...args}
                    selectedSuggestions={selectedSuggestions}
                    suggestions={getSuggestions()}
                    onBlur={onBlur}
                    allowMixingSuggestionsAndLoading={!!inputValue.length}
                    onSelectionAdd={onSelectionAdd}
                    onSelectionRemove={onSelectionRemove}
                    onInputValueChange={onInputValueChange}
                    onClearAllSelected={onClearAllSelected}
                />
            </div>
        );
    },
};

/**
 * This story demonstrates how you can add props and function to allow mix of single select and multi select options together.
 * The business case we demonstrate here is has the following requirements:
 * * The user can select free text input
 * * When free text input is selected it should behave as a single select component
 * * All other suggestions can be selected in a multi-select fashion.
 *
 * The **important parts** here are:
 * * passing inputRef prop, so we can access the input field from outside
 * * calling inputRef.current.blur() in onSelectionAdded callback when needed
 * when a _single selection happened_:
 * * passing a custom customSelectionIndicator node to alter the look and feel of the blurred component
 * * passing initInputValue so that the input field gets populated when the component receives focus again.
 */
export const Dance: Story = {
    name: 'Autosuggest as a dance of single and multi-selection',
    args: {
        id: 'test',
        inputPlaceholder: 'Select something...',
        suggestionToString: SUGGESTION_TO_STRING,
        isLoading: false,
        showClearButton: true,
        clearTitle: 'Clear',
    },
    render: (args) => {
        const [selectedSuggestions, setSelectedSuggestions] = React.useState<TComplexSuggestion[]>(
            []
        );
        const [singleSelectedText, setSingleSelectedText] = React.useState('');
        const [inputValue, setInputValue] = React.useState('');
        const inputRef = React.createRef<HTMLInputElement>();

        const getSuggestions = (): TComplexSuggestion[] => {
            // filtering suggestions from some other source
            const autoSuggestions = COMPLEX_SUGGESTIONS.filter(
                (item: TComplexSuggestion) =>
                    // suggestion is relevant to input
                    item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) &&
                    // suggestion not yet selected
                    !selectedSuggestions.some(
                        (i) => item.name.toLocaleLowerCase() === i.name.toLocaleLowerCase()
                    )
            );

            // add free text option if there is an input by the user and not other suggestions were selected yet
            return inputValue.length && !selectedSuggestions.length
                ? [{ name: inputValue, type: 'free-text' }, ...autoSuggestions]
                : autoSuggestions;
        };

        const onInputValueChange = (value: string) => {
            console.log(`onInputValueChange was called with ${value}`);
            setInputValue(value);
        };

        // most of the magic is happening here
        const onSelectionAdd = (item: TComplexSuggestion) => {
            console.log(`onSelectionAdd was called with {name: ${item.name}, type: ${item.type}}`);
            // Selected option requires single select behavior
            if (item.type === 'free-text') {
                // save the value to our 'single select' state
                setSingleSelectedText(item.name);
                // Force UI behavior to single select - blur the field
                inputRef.current?.blur();
                // all done
                return;
            }

            // a multi selectable option was chosen
            // it is where the user can replace previously selected free text with something else
            // remove previously selected free text
            if (singleSelectedText) {
                setSingleSelectedText('');
            }
            // Add new item to multi selection list
            setSelectedSuggestions([...selectedSuggestions, item]);
        };

        const onSelectionRemove = (item: TSuggestion) => {
            console.log(`onSelectionRemove was called with {name: ${item.name}}`);

            // Delete item
            if (!inputValue) {
                setSelectedSuggestions(
                    selectedSuggestions.filter((i: TSuggestion) => i.name !== item.name)
                );
            }
        };

        const onBlur = () => {
            console.log('onBlur was called');
            // inputValue is used to filter suggestions,
            // preserve it for free text selection, but not otherwise
            setInputValue(singleSelectedText || '');
        };

        const onOuterClick = () => {
            console.log('onOuterClick was called');
            // if the user clicked outside, after typing something, but without selecting any suggestions
            // we should treat the typed value as a selection
            if (!selectedSuggestions.length && inputValue) {
                setSingleSelectedText(inputValue);
            }
        };

        // Make sure to clear both states that hold selections
        const onClearAllSelected = () => {
            console.log('onClearAllSelected was called');
            setSelectedSuggestions([]);
            setSingleSelectedText('');
        };

        // Other magical prop -> will overwrite standard blurred render UI
        const customBlur = (
            <div
                style={{
                    alignSelf: 'center',
                    marginLeft: '6px',
                }}
            >
                {singleSelectedText}
            </div>
        );

        return (
            <div style={{ width: '500px' }}>
                <Autosuggest
                    {...args}
                    selectedSuggestions={selectedSuggestions}
                    suggestions={getSuggestions()}
                    onBlur={onBlur}
                    allowMixingSuggestionsAndLoading={!!inputValue.length}
                    onSelectionAdd={onSelectionAdd}
                    onSelectionRemove={onSelectionRemove}
                    onInputValueChange={onInputValueChange}
                    onClearAllSelected={onClearAllSelected}
                    onOuterClick={onOuterClick}
                    inputRef={inputRef}
                    // this will trick to UI to pre-fill the in input field when it gets focused again
                    initInputValue={singleSelectedText}
                    // Here we switch the UI behavior based on our local state
                    customSelectionIndicator={singleSelectedText ? customBlur : undefined}
                />
            </div>
        );
    },
};
