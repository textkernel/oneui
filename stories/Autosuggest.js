import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { Autosuggest, IconMatch } from '@textkernel/oneui';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING
} from '../src/components/Autosuggest/__mocks__/suggestions';

storiesOf('Organizms|Autosuggest', module)
    .addDecorator(withKnobs)
    .add('Autosuggest as single select with icon', () => (
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
    .add('Autosuggest with multiselect options', () => (
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
    ));
