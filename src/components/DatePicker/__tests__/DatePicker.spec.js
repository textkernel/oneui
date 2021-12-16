import React from 'react';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
    let wrapper;
    const handleChange = jest.fn();

    const openCalendar = () => {
        wrapper.find('input').at(0).simulate('focus');
    };

    beforeAll(() => {
        MockDate.set('2021-12-24');
    });

    afterAll(() => {
        MockDate.reset();
    });

    beforeEach(() => {
        wrapper = mount(<DatePicker onChange={handleChange} />);
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly when calendar is open', () => {
        openCalendar();
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onChange function with Date object', () => {
        // A simplistic regression test for the library
        wrapper.find('input').simulate('change', { target: { value: '11/1/2021' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange.mock.calls[0][0] instanceof Date).toBeTruthy();
    });
    it('should set year boundaries on header to default', () => {
        const currentYear = new Date().getFullYear();

        openCalendar();
        expect(wrapper.find('CalendarHeader').prop('yearsRange')).toEqual([
            currentYear - 100,
            currentYear + 100,
        ]);
    });
    it('should set year boundaries on header when minDate and maxDate are passed', () => {
        const minDate = new Date('2021-11-23');
        const maxDate = new Date('2023-03-04');

        wrapper.setProps({ minDate, maxDate });
        wrapper.update();

        openCalendar();
        expect(wrapper.find('CalendarHeader').prop('yearsRange')).toEqual([
            minDate.getFullYear(),
            maxDate.getFullYear(),
        ]);
    });
});
