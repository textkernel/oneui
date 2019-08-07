import React from 'react';
import toJson from 'enzyme-to-json';
import LocationAutocomplete from '../LocationAutocomplete';

describe('<LocationAutocomplete/> that loads google api and renders a LocationAutocomplete', () => {
    it('should render with default props', () => {
        const wrapper = mount(
            <LocationAutocomplete
                apiKey="someKey"
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={() => null}
            />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
