import React from 'react';
import toJson from 'enzyme-to-json';
import { CalendarHeader } from '../CalendarHeader';

describe('CalendarHeader', () => {
    const YEARS = [2016, 2025];
    const decreaseMonth = jest.fn();
    const increaseMonth = jest.fn();
    const changeYear = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <CalendarHeader
                yearsRange={YEARS}
                date={new Date('2021-12-31')}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
                changeYear={changeYear}
            />
        );
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should log an error and render nothing if min year is larger then max year', () => {
        // don't log to test output
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
        wrapper.setProps({ yearsRange: [9, 2] });
        wrapper.update();

        expect(wrapper.html()).toBe(null);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy.mock.calls[0][0].replace(/\s/g, '')).toMatch(
            `CalendarHeader component has received invalid props.
        Minimum selectable year (9) is larger then maximum selectable year (2)`.replace(/\s/g, '')
        );
    });
    it('should fill in the years correctly', () => {
        const options = wrapper.find('option');
        // eslint-disable-next-line no-plusplus
        for (let year = YEARS[0]; year <= YEARS[1]; year++) {
            const idx = year - YEARS[0];
            expect(options.at(idx).prop('value')).toEqual(year);
        }
    });
    it('should display the month in the correct language', () => {
        expect(wrapper.find('Text').text()).toBe('December');
    });
    it('should call decreaseMonth when previous nav button is clicked', () => {
        wrapper.find('button').at(0).simulate('click');
        expect(decreaseMonth).toHaveBeenCalledTimes(1);
    });
    it('should call increaseMonth when next nav button is clicked', () => {
        wrapper.find('button').at(1).simulate('click');
        expect(increaseMonth).toHaveBeenCalledTimes(1);
    });
    it('should call changeYear when year is selected', () => {
        wrapper.find('select').simulate('change', { target: { value: 2019 } });
        expect(changeYear).toHaveBeenCalledTimes(1);
        expect(changeYear).toHaveBeenCalledWith(2019);
    });
});
