import React from 'react';
import toJson from 'enzyme-to-json';
import { LocationAutocompleteWithGoogleLoader } from '../LocationAutocompleteWithGoogleLoader';

describe('<LocationAutocompleteWithGoogleLoader/> that loads google api and renders a LocationAutocompleteWithGoogleLoader', () => {
    it('should render with default props', () => {
        const wrapper = mount(
            <LocationAutocompleteWithGoogleLoader
                apiKey="someKey"
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={() => null}
            />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
