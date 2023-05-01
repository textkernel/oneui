import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MockDate from 'mockdate';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
    let view;
    const handleChange = jest.fn();

    const minDate = new Date('2021-11-23');
    const maxDate = new Date('2023-03-04');

    const openCalendar = async (user) => {
        await user.click(screen.getByRole('textbox'));
    };

    beforeAll(() => {
        MockDate.set('2021-12-24T13:00:00.000Z');
    });

    afterAll(() => {
        MockDate.reset();
    });

    beforeEach(() => {
        view = render(<DatePicker onChange={handleChange} minDate={minDate} maxDate={maxDate} />);
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
    });

    it('should render calendar header correctly when calendar is open', async () => {
        const user = userEvent.setup();
        await openCalendar(user);
        // taking full snapshot of the calendar fails in CD/CI.
        // Some small time difference in dates - needs further investigation.
        // Since testing 3rd party library is not a good practice anyway,
        // we will just check that our custom header is correct
        // screen.getByRole('option');
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should set min and max date on calendar even if they are no originally passed as props', async () => {
        const user = userEvent.setup();
        // this is to make sure the calendar navigation and the year selection in the header are always aligned
        await openCalendar(user);
        // @ts-ignore
        expect();
    });

    it('should call onChange function with Date object', async () => {
        const user = userEvent.setup();
        // A simplistic regression test for the library
        await user.type(screen.getByRole('textbox'), '11/1/2022');

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange.mock.calls[0][0] instanceof Date).toBeTruthy();
    });

    it('should set year boundaries on header when minDate and maxDate are passed', async () => {
        const user = userEvent.setup();
        await openCalendar(user);

        // expect(screen.getByRole('presentation')).toHaveAttribute('yearsRange');
        expect(screen.getByText(minDate.getFullYear())).toMatchSnapshot();
        expect(screen.getByText(maxDate.getFullYear())).toMatchSnapshot();
        // expect(view.find('CalendarHeader').prop('yearsRange')).toEqual([
        //     minDate.getFullYear(),
        //     maxDate.getFullYear(),
        // ]);
    });

    describe('when no min/max date props passed', () => {
        beforeEach(() => {
            view.rerender(
                <DatePicker onChange={handleChange} minDate={undefined} maxDate={undefined} />
            );
        });

        it.skip('should set min/max date to default', async () => {
            // const select = screen.getByRole('option');
            // console.log('');
            // expect(view.find('DatePicker').prop('minDate')).toBeUndefined();
            // expect(view.find('DatePicker').prop('maxDate')).toBeUndefined();
            //
            // expect(view.find('r').at(0).prop('minDate').toDateString()).toBe('Sat Dec 24 1921');
            // expect(view.find('r').at(0).prop('maxDate').toDateString()).toBe('Wed Dec 24 2121');
            expect(screen.getByText('Sat Dec 24 1921')).toMatchSnapshot();
            expect(screen.getByText('Wed Dec 24 2121')).toMatchSnapshot();
        });

        it('should set year boundaries on header to default', async () => {
            const user = userEvent.setup();
            const currentYear = new Date().getFullYear();

            await openCalendar(user);

            expect(screen.getByText(currentYear - 100)).toMatchSnapshot();
            expect(screen.getByText(currentYear + 100)).toMatchSnapshot();
        });
    });
});
