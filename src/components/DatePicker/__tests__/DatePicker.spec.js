import React from 'react';
import toJson from 'enzyme-to-json';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
    const YEARS = [2016, 2025];
    let wrapper;
    const handleChange = jest.fn();

    beforeEach(() => {
        wrapper = mount(<DatePicker yearsRange={YEARS} onChange={handleChange} />);
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onChange function with Date object', () => {
        // A simplistic regression test for the library
        wrapper.find('input').simulate('change', { target: { value: '11/1/2021' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange.mock.calls[0][0] instanceof Date).toBeTruthy();
    });
});
