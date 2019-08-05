import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { LocationAutocomplete } from '@textkernel/oneui';

storiesOf('Organisms|LocationAutocomplete', module)
    .addDecorator(withKnobs)
    .add(
        'LocationAutocomplete',
        () => {
            const onSelectionChange = value => {
                console.log('onSelectionChange was called with:');
                console.log(value);
            };
            return (
                <LocationAutocomplete
                    apiKey=""
                    inputPlaceholder={text('Input field placeholder', 'Enter a city or region...')}
                    noSuggestionsPlaceholder={text(
                        'No suggestions found text',
                        'No suggestions found'
                    )}
                    onSelectionChange={onSelectionChange}
                    country={text('Restrict results to country', 'UK')}
                />
            );
        },
        {
            info: {
                text: `
    ## Note about props

    'LocationAutocomplete' is a wrapper around the 'LocationAutocompleteRenderer' component, and it makes sure the Google API is loaded on the page. 
    
    You don't need to use 'LocationAutocompleteRenderer' directly.
    'LocationAutocomplete' __will pass props__ that are not needed for loading the API __to 'LocationAutocompleteRenderer'__, so you can provide them all together. For list of props see below
    `,
            },
        }
    );
