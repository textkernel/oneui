import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LocationAutocompleteWithGoogleLoader } from '../LocationAutocompleteWithGoogleLoader';

describe('<LocationAutocompleteWithGoogleLoader/> that loads google api and renders a LocationAutocompleteWithGoogleLoader', () => {
    it('should render with default props', () => {
        const view = render(
            <LocationAutocompleteWithGoogleLoader
                apiKey="someKey"
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={() => null}
            />
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
