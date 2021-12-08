import React from 'react';
import toJson from 'enzyme-to-json';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
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
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<DatePicker years={YEARS} monthsNames={MONTH_NAMES} />);
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
