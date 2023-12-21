import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LocationAutocompleteWithGoogleLoader, LocationAutocomplete } from '@textkernel/oneui';
import { ensureApiKey } from '../utils/ensureApiKey';

const meta: Meta<typeof LocationAutocompleteWithGoogleLoader> = {
    title: 'Organisms/LocationAutocomplete',
    component: LocationAutocompleteWithGoogleLoader,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { LocationAutocomplete } as any,
};

export default meta;

type Story = StoryObj<typeof LocationAutocompleteWithGoogleLoader>;

const apiKey = ensureApiKey('places') || '';
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

export const _LocationAutocomplete: Story = {
    name: 'LocationAutocomplete',
    args: {
        apiKey,
        inputPlaceholder: 'Enter a city or region...',
        noSuggestionsPlaceholder: 'No suggestions found',
        clearTooltipLabel: 'Clear',
        country: 'UK',
        onError,
    },
    render: (args) => <LocationAutocompleteWithGoogleLoader {...args} />,
};
