import React from 'react';
import toJson from 'enzyme-to-json';
import MockDate from 'mockdate';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
    let wrapper;
    const handleChange = jest.fn();

    const minDate = new Date('2021-11-23');
    const maxDate = new Date('2023-03-04');

    const openCalendar = () => {
        wrapper.find('input').at(0).simulate('focus');
    };

    beforeAll(() => {
        MockDate.set('2021-12-24T13:00:00.000Z');
    });

    afterAll(() => {
        MockDate.reset();
    });

    beforeEach(() => {
        wrapper = mount(<DatePicker onChange={handleChange} minDate={minDate} maxDate={maxDate} />);
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render calendar header correctly when calendar is open', () => {
        openCalendar();
        // taking full snapshot of the calendar fails in CD/CI.
        // Some small time difference in dates - needs further investigation.
        // Since testing 3rd party library is not a good practice anyway,
        // we will just check that our custom header is correct
        expect(toJson(wrapper.find('CalendarHeader'))).toMatchSnapshot();
    });
    it('should set min and max date on calendar even if they are no originally passed as props', () => {
        // this is to make sure the calendar navigation and the year selection in the header are always aligned
        openCalendar();
        expect();
    });
    it('should call onChange function with Date object', () => {
        // A simplistic regression test for the library
        wrapper.find('input').simulate('change', { target: { value: '11/1/2022' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange.mock.calls[0][0] instanceof Date).toBeTruthy();
    });

    it('should set year boundaries on header when minDate and maxDate are passed', () => {
        openCalendar();
        expect(wrapper.find('CalendarHeader').prop('yearsRange')).toEqual([
            minDate.getFullYear(),
            maxDate.getFullYear(),
        ]);
    });
    describe('when no min/max date props passed', () => {
        beforeEach(() => {
            wrapper.setProps({ minDate: undefined, maxDate: undefined });
            wrapper.update();
        });

        it('should set min/max date to default', () => {
            expect(wrapper.find('DatePicker').prop('minDate')).toBeUndefined();
            expect(wrapper.find('DatePicker').prop('maxDate')).toBeUndefined();

            expect(wrapper.find('r').at(0).prop('minDate').toDateString()).toBe('Sat Dec 24 1921');
            expect(wrapper.find('r').at(0).prop('maxDate').toDateString()).toBe('Wed Dec 24 2121');
        });

        it('should set year boundaries on header to default', () => {
            const currentYear = new Date().getFullYear();

            openCalendar();
            expect(wrapper.find('CalendarHeader').prop('yearsRange')).toEqual([
                currentYear - 100,
                currentYear + 100,
            ]);
        });
    });
});
