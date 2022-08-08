import * as React from 'react';
import { LocationAutocompleteWithGoogleLoader, LocationAutocomplete } from '@textkernel/oneui';
import { ensureApiKey } from './utils/ensureApiKey';

export default {
    title: 'Organisms/LocationAutocomplete',
    component: LocationAutocomplete,
    subcomponents: { LocationAutocompleteWithGoogleLoader },
};

const apiKey = ensureApiKey('places');
export const _LocationAutocomplete = (args) => <LocationAutocompleteWithGoogleLoader {...args} />;
const onError = (error) => {
    if (error === 'REQUEST_DENIED') {
        // eslint-disable-next-line no-alert
        window.alert(
            'For this component to work, please reload the page and provide a valid API key'
        );
    } else {
        console.log(`Google places API responded with: ${error}`);
    }
};
_LocationAutocomplete.args = {
    apiKey,
    inputPlaceholder: 'Enter a city or region...',
    noSuggestionsPlaceholder: 'No suggestions found',
    clearLabel: 'Clear',
    country: 'UK',
    onError: onError,
};
