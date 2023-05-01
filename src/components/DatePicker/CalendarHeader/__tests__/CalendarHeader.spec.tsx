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
    let view;

    beforeEach(() => {
        view = render(
            // @ts-ignore
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
        expect(view.container).toMatchSnapshot();
    });

    it('should log an error and render nothing if min year is larger then max year', () => {
        // don't log to test output
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
        view.rerender(
            // @ts-ignore
            <CalendarHeader
                yearsRange={[9, 2]}
                date={new Date('2021-12-31')}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
                changeYear={changeYear}
            />
        );

        // expect(view.html).toBe(null);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy.mock.calls[0][0].replace(/\s/g, '')).toMatch(
            `CalendarHeader component has received invalid props.
        Minimum selectable year (9) is larger then maximum selectable year (2)`.replace(/\s/g, '')
        );
    });

    it('should fill in the years correctly', () => {
        // const check = screen.getAllByRole('option');
        const options = screen.getAllByRole('option');
        // eslint-disable-next-line no-plusplus
        for (let year = YEARS[0]; year <= YEARS[1]; year++) {
            const idx = year - YEARS[0];

            expect(options[idx]).toHaveAttribute('value', year.toString().replace('"', ''));
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

    it.skip('should call changeYear when year is selected', async () => {
        // const combobox = screen.getByRole('combobox');

        // wrapper.find('select').simulate('change', { target: { value: 2019 } });
        expect(changeYear).toHaveBeenCalledTimes(1);
        expect(changeYear).toHaveBeenCalledWith(2019);
    });
});
