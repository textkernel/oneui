import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, withKnobs } from '@storybook/addon-knobs';
import { LocationAutocompleteWithGoogleLoader, LocationAutocomplete } from '@textkernel/oneui';
import ensureApiKey from './utils/ensureApiKey';

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

            const apiKey = ensureApiKey('places');

            return (
                <LocationAutocompleteWithGoogleLoader
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
                    hidePoweredByGoogleLogo={boolean('Hide powered by Google logo', false)}
                />
            );
        },
        {
            info: {
                propTables: [LocationAutocompleteWithGoogleLoader, LocationAutocomplete],
                text: `
    ## Note about props

    'LocationAutocompleteWithGoogleLoader' is a wrapper around the 'LocationAutocomplete' component, and it makes sure the Google API is loaded on the page.

    You don't need to use 'LocationAutocomplete' directly.
    'LocationAutocompleteWithGoogleLoader' __will pass props__ that are not needed for loading the API __to 'LocationAutocomplete'__, so you can provide them all together. For list of props see below
    `,
            },
        }
    );
