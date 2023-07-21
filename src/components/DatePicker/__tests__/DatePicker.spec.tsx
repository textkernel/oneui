import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MockDate from 'mockdate';
import { DatePicker } from '../DatePicker';

describe('DatePicker', () => {
    let view: RenderResult;
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
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render calendar header correctly when calendar is open', async () => {
        const user = userEvent.setup();
        await openCalendar(user);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('presentation')).toBeInTheDocument();
        expect(screen.getAllByRole('option')).toHaveLength(38);
        expect(screen.getByRole('presentation')).toBeInTheDocument();
    });

    it('should set min and max date on calendar even if they are no originally passed as props', async () => {
        view.rerender(<DatePicker onChange={handleChange} />);
        const user = userEvent.setup();
        // this is to make sure the calendar navigation and the year selection in the header are always aligned
        await openCalendar(user);

        expect(
            screen.getByRole('option', { name: minDate.getFullYear().toString() })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('option', { name: maxDate.getFullYear().toString() })
        ).toBeInTheDocument();
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

        expect(screen.getByText(minDate.getFullYear())).toBeInTheDocument();
        expect(screen.getByText(maxDate.getFullYear())).toBeInTheDocument();
    });

    describe('when no min/max date props passed', () => {
        beforeEach(() => {
            view.rerender(
                <DatePicker onChange={handleChange} minDate={undefined} maxDate={undefined} />
            );
        });

        it('should set min/max date to default', async () => {
            const user = userEvent.setup();

            await openCalendar(user);

            expect(view.container).toMatchSnapshot();
            expect(
                screen.getByRole('option', { name: minDate.getFullYear().toString() })
            ).toBeInTheDocument();
            expect(
                screen.getByRole('option', { name: maxDate.getFullYear().toString() })
            ).toBeInTheDocument();
        });

        it('should set year boundaries on header to default', async () => {
            const user = userEvent.setup();
            const currentYear = new Date().getFullYear();

            await openCalendar(user);

            expect(screen.getByText(currentYear - 100)).toBeInTheDocument();
            expect(screen.getByText(currentYear + 100)).toBeInTheDocument();
        });
    });
});
