import React from 'react';
import toJson from 'enzyme-to-json';
import { Slider } from '../Slider';

describe('Slider component', () => {
    it('should render component correctly', () => {
        const wrapper = mount(<Slider />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
