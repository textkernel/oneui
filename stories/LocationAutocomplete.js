import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { LocationAutocomplete, LocationAutocompleteRenderer } from '@textkernel/oneui';

let apiKey = '';
let timer = null;

function debondcePrompt() {
    if (!timer) {
        apiKey = window.prompt('Please provide a Google API key'); // eslint-disable-line no-alert
    }

    timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
    }, 500);
}

storiesOf('Organisms|LocationAutocomplete', module)
    .addDecorator(withKnobs)
    .add(
        'LocationAutocomplete',
        () => {
            const onSelectionChange = value => {
                console.log('onSelectionChange was called with:');
                console.log(value);
            };

            const onError = error => {
                if (error === 'REQUEST_DENIED') {
                    // eslint-disable-next-line no-alert
                    window.alert(
                        'For this component to work, please reload the page and provide a valid API key'
                    );
                } else {
                    console.log(`Google places API responded with: ${error}`);
                }
            };

            if (!apiKey && !(window.google && window.google.maps && window.google.maps.places)) {
                debondcePrompt();
            }

            return (
                <LocationAutocomplete
                    apiKey={apiKey}
                    inputPlaceholder={text('Input field placeholder', 'Enter a city or region...')}
                    noSuggestionsPlaceholder={text(
                        'No suggestions found text',
                        'No suggestions found'
                    )}
                    onSelectionChange={onSelectionChange}
                    country={text('Restrict results to country', 'UK')}
                    showCountryInSuggestions={boolean(
                        'Should show state and country in suggestions',
                        false
                    )}
                    onError={onError}
                />
            );
        },
        {
            info: {
                propTables: [LocationAutocomplete, LocationAutocompleteRenderer],
                text: `
    ## Note about props

    'LocationAutocomplete' is a wrapper around the 'LocationAutocompleteRenderer' component, and it makes sure the Google API is loaded on the page.

    You don't need to use 'LocationAutocompleteRenderer' directly.
    'LocationAutocomplete' __will pass props__ that are not needed for loading the API __to 'LocationAutocompleteRenderer'__, so you can provide them all together. For list of props see below
    `,
            },
        }
    );
