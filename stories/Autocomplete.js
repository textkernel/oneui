import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { Autocomplete, IconMatch } from '@textkernel/oneui';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING
} from '../src/components/Autocomplete/__mocks__/suggestions';

storiesOf('Autocomplete', module)
    .addDecorator(withKnobs)
    .add('Autocomplete as single select with icon', () => (
        <Autocomplete
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
            isProminent
            style={{ width: '650px' }}
        />
    ))
    .add('Autocomplete with multiselect options', () => (
        <Autocomplete
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
    ));
