import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { Autocomplete } from '@textkernel/oneui';

const SUGGESTIONS = [
    { name: 'Sun' },
    { name: 'Moon' },
    { name: 'Mercury' },
    { name: 'Venus' },
    { name: 'Earth' },
    { name: 'Mars' },
    { name: 'Jupiter' },
    { name: 'Saturn' },
    { name: 'Neptun' }
];

storiesOf('Autocomplete', module)
    .addDecorator(withKnobs)
    .add('Autocomplete as single select', () => (
        <Autocomplete
            getSuggestions={() => SUGGESTIONS}
            suggestionToString={item => (item ? item.name : '')}
            isLoading={boolean('Loading', false)}
            inputPlaceholder={text('Input placeholder', 'Select something...')}
            noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
            clearTitle={text('Remove button label', 'Clear')}
            onBlur={() => console.log('onBlur was called')}
            onSelectionChange={item =>
                console.log(`onSelectionChange was called with ${item.name} object`)
            }
            onInputValueChange={value => console.log(`onInputValueChange was called with ${value}`)}
            clearSelectedSuggestions={() => console.log('clearSelectedSuggestions was called')}
            showClearButton={boolean('Show clear button', true)}
        />
    ))
    .add('Autocomplete with multiselect options', () => (
        <Autocomplete
            selectedSuggestions={SUGGESTIONS.slice(2, 4)}
            getSuggestions={() => SUGGESTIONS}
            suggestionToString={item => (item ? item.name : '')}
            isLoading={boolean('Loading', false)}
            selectedPlaceholder={text('Placeholder for selected items', null)}
            inputPlaceholder={text('Input placeholder', 'Select something...')}
            noSuggestionsPlaceholder={text('No suggestions', 'No suggestions found...')}
            clearTitle={text('Remove button label', 'Clear')}
            onBlur={() => console.log('onBlur was called')}
            onSelectionChange={item =>
                console.log(`onSelectionChange was called with "${item.name}" object`)
            }
            onInputValueChange={value => console.log(`onInputValueChange was called with ${value}`)}
            clearSelectedSuggestions={() => console.log('clearSelectedSuggestions was called')}
            showClearButton={boolean('Show clear button', true)}
        />
    ));
