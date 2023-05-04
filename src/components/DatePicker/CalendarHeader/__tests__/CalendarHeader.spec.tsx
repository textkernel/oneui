import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { CalendarHeader } from '../CalendarHeader';

describe('CalendarHeader', () => {
    const YEARS = [2016, 2025] as [number, number];
    const decreaseMonth = jest.fn();
    const increaseMonth = jest.fn();
    const changeYear = jest.fn();
    const changeMonth = jest.fn();
    const decreaseYear = jest.fn();
    const increaseYear = jest.fn();
    const currentMonth = new Date();
    let view;

    beforeEach(() => {
        view = render(
            <CalendarHeader
                yearsRange={YEARS}
                date={new Date('2021-12-31')}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
                changeYear={changeYear}
                changeMonth={changeMonth}
                customHeaderCount={0}
                decreaseYear={decreaseYear}
                increaseYear={increaseYear}
                monthDate={currentMonth}
                nextMonthButtonDisabled={false}
                nextYearButtonDisabled
                prevMonthButtonDisabled={false}
                prevYearButtonDisabled
            />
        );
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('presentation')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(YEARS[1] - YEARS[0] + 1);
    });

    it('should log an error and render nothing if min year is larger then max year', () => {
        // don't log to test output
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
        view.rerender(
            <CalendarHeader
                yearsRange={[9, 2]}
                date={new Date('2021-12-31')}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
                changeYear={changeYear}
                changeMonth={changeMonth}
                customHeaderCount={0}
                decreaseYear={decreaseYear}
                increaseYear={increaseYear}
                monthDate={currentMonth}
                nextMonthButtonDisabled={false}
                nextYearButtonDisabled
                prevMonthButtonDisabled={false}
                prevYearButtonDisabled
            />
        );

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy.mock.calls[0][0].replace(/\s/g, '')).toMatch(
            `CalendarHeader component has received invalid props.
        Minimum selectable year (9) is larger then maximum selectable year (2)`.replace(/\s/g, '')
        );
    });

    it('should fill in the years correctly', () => {
        const options = screen.getAllByRole('option');
        for (let year = YEARS[0]; year <= YEARS[1]; year += 1) {
            const idx = year - YEARS[0];

            expect(options[idx]).toHaveAttribute('value', year.toString().replace(/"/g, ''));
        }
    });

    it('should display the month in the correct language', () => {
        expect(screen.getByText('December')).toBeInTheDocument();
    });

    it('should call decreaseMonth when previous nav button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getAllByRole('button')[0]);

        expect(decreaseMonth).toHaveBeenCalledTimes(1);
    });

    it('should call increaseMonth when next nav button is clicked', async () => {
        const user = userEvent.setup();
        await user.click(screen.getAllByRole('button')[1]);

        expect(increaseMonth).toHaveBeenCalledTimes(1);
    });

    it('should call changeYear when year is selected', async () => {
        const user = userEvent.setup();
        await user.selectOptions(screen.getByRole('combobox'), '2019');

        expect(changeYear).toHaveBeenCalledTimes(1);
        expect(changeYear).toHaveBeenCalledWith(2019);
    });
});
