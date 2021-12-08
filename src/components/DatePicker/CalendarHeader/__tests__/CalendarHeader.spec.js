import React from 'react';
import toJson from 'enzyme-to-json';
import { CalendarHeader } from '../CalendarHeader';

describe('CalendarHeader', () => {
    const MONTH_NAMES = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const YEARS = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    const decreaseMonth = jest.fn();
    const increaseMonth = jest.fn();
    const changeYear = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <CalendarHeader
                years={YEARS}
                monthsNames={MONTH_NAMES}
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
