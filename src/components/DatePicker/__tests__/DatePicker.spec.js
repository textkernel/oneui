import React from 'react';
import toJson from 'enzyme-to-json';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
    const YEARS = [2016, 2025];
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<DatePicker yearsRange={YEARS} />);
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
