import React from 'react';
import toJson from 'enzyme-to-json';
import Map from '../Map';

describe('<Map/> that loads google api and renders a Map', () => {
    it('should render with default props', () => {
        const wrapper = mount(<Map apiKey="someKey" />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
