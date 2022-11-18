import React from 'react';
import toJson from 'enzyme-to-json';
import { RangeSlider } from '../RangeSlider';

describe('RangeSlider component', () => {
    it('should render component correctly', () => {
        const wrapper = mount(<RangeSlider />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
