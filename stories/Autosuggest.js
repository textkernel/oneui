import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { Autosuggest, IconMatch } from '@textkernel/oneui';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../src/components/Autosuggest/__mocks__/suggestions';

storiesOf('Organisms|Autosuggest', module)
    .addDecorator(withKnobs)
    .add('Single select with icon', () => (
        <Autosuggest
            getSuggestions={() => SUGGESTIONS}
            suggestionToString={SUGGESTION_TO_STRING}
            isLoading={boolean('Loading', false)}
            inputPlaceholder={text('Input placeholder', 'Select something...')}
            noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
            clearTitle={text('Remove button label', 'Clear')}
            onBlur={() => console.log('onBlur was called')}
            onSelectionChange={item =>
                console.log(`onSelectionChange was called with ${item.name} object`)
            }
            onInputValueChange={value => console.log(`onInputValueChange was called with ${value}`)}
            onClearAllSelected={() => console.log('onClearAllSelected was called')}
            showClearButton={boolean('Show clear button', true)}
            iconNode={<IconMatch />}
            isProminent={boolean('Use prominent styling', true)}
            style={{ width: '650px' }}
        />
    ))
    .add('Multiselect', () => (
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
            onSelectionChange={item =>
                console.log(`onSelectionChange was called with "${item.name}" object`)
            }
            onInputValueChange={value => console.log(`onInputValueChange was called with ${value}`)}
            onClearAllSelected={() => console.log('onClearAllSelected was called')}
            showClearButton={boolean('Show clear button', true)}
            isMultiselect={boolean('Multiselect mode', true)}
            isProminent={boolean('Use prominent styling', true)}
            style={{ width: '650px' }}
        />
    ))
    .add('Example implementation', () => {
        // eslint-disable-next-line react/prop-types
        const Implementation = ({ style }) => {
            const [selectedSuggestions, setSelectedSuggestions] = React.useState([]);
            const [inputValue, setInputValue] = React.useState('');

            const getSuggestions = () => {
                if (!inputValue.length) return [];
                return SUGGESTIONS.filter(item => !selectedSuggestions.includes(item)).filter(
                    item => item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
                );
            };

            const onInputValueChange = value => {
                console.log(`onInputValueChange was called with ${value}`);
                setInputValue(value);
            };

            const getSelectedPlaceholder = () => {
                const numOfItems = selectedSuggestions.length;
                if (!numOfItems) {
                    return '';
                }

                if (numOfItems === 1) {
                    return SUGGESTION_TO_STRING(selectedSuggestions[0]);
                }

                return `${SUGGESTION_TO_STRING(selectedSuggestions[0])} + ${numOfItems - 1} more`;
            };

            const onSelectionChange = item => {
                console.log(`onSelectionChange was called with {name: ${item.name}}`);
                if (selectedSuggestions.includes(item)) {
                    const newSelection = selectedSuggestions.filter(el => el.name !== item.name);
                    setSelectedSuggestions(newSelection);
                } else {
                    setSelectedSuggestions([...selectedSuggestions, item]);
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
                <Autosuggest
                    selectedSuggestions={
                        boolean('Add selectedSuggestions', true) ? selectedSuggestions : undefined
                    }
                    selectedPlaceholder={
                        boolean('Add selectionPlaceholder', true)
                            ? getSelectedPlaceholder()
                            : undefined
                    }
                    isLoading={boolean('Loading', false)}
                    showClearButton={boolean('Show clear button', true)}
                    isMultiselect={boolean('Multiselect', true)}
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
                    style={style}
                />
            );
        };

        Implementation.displayName = 'Implementation';

        return <Implementation style={{ width: '650px' }} />;
    });
