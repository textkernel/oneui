import React from 'react';
import toJson from 'enzyme-to-json';
import { MapWithGoogleLoader } from '..';

describe('<MapWithGoogleLoader/> that loads google api and renders a Map', () => {
    it('should render with default props', () => {
        const wrapper = mount(<MapWithGoogleLoader apiKey="someKey" />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
