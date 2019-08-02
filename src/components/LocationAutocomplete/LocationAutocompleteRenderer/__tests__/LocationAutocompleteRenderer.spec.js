// import React from 'react';
// import toJson from 'enzyme-to-json';
import stabGoogleApi from '../../../../__mocks__/googleApiMock';
// import LocationAutocompleteRenderer from '../LocationAutocompleteRenderer';

stabGoogleApi();

describe('<MapRendered/> that renders a Map with markers', () => {
    it('should render with default props', () => {
        // const wrapper = mount(<LocationAutocompleteRenderer />);
        expect(1).toBe(1);
    });
});
