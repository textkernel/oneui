import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { NumericStepper } from '../NumericStepper';

describe('<NumericStepper> component', () => {
    let view: RenderResult;
    const onChangeMock = jest.fn();

    const decreaseClick = async (user) => {
        await user.click(screen.getAllByRole('button')[0]);
    };

    const increaseClick = async (user) => {
        await user.click(screen.getAllByRole('button')[1]);
    };

    it('should render correctly', () => {
        view = render(<NumericStepper onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('spinbutton')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should have correct values with default props', () => {
        view = render(<NumericStepper onChange={onChangeMock} />);

        const input = screen.getByRole('spinbutton');
        const stepperButtons = screen.getAllByRole('button');

        expect(input).toHaveAttribute('value', '0');
        expect(input).toHaveAttribute('step', '1');
        expect(input).toHaveAttribute('min', '0');
        expect(input).toHaveAttribute('max', '9007199254740991');
        expect(input).toHaveAttribute('style', 'width: 3ch;');
        expect(stepperButtons[0]).toHaveAttribute('disabled');
        expect(stepperButtons[1]).not.toHaveAttribute('disabled');
    });

    it('should have correct values with custom props', () => {
        view = render(
            <NumericStepper
                onChange={onChangeMock}
                step={2}
                minValue={2}
                maxValue={6}
                defaultValue={4}
                customWidth="4ch"
            />
        );
        expect(view.container).toMatchSnapshot();

        const inputButton = screen.getByRole('spinbutton');
        const stepperButtons = screen.getAllByRole('button');

        expect(inputButton).toHaveAttribute('min', '2');
        expect(inputButton).toHaveAttribute('max', '6');
        expect(inputButton).toHaveAttribute('step', '2');
        expect(inputButton).toHaveAttribute('style', 'width: 4ch;');
        expect(inputButton).toHaveAttribute('value', '4');
        expect(stepperButtons[0]).not.toHaveAttribute('disabled');
        expect(stepperButtons[1]).not.toHaveAttribute('disabled');
    });

    it('should react on stepDown click', async () => {
        const user = userEvent.setup();
        view = render(<NumericStepper onChange={onChangeMock} step={2} defaultValue={4} />);
        const inputButton = screen.getByRole('spinbutton');

        // Decrease by 2 (to equal to 2) and make sure that number of onChange calls equal to 1
        await decreaseClick(user);

        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(2);
        expect(inputButton).toHaveAttribute('value', '2');

        // Decrease by 2 (to equal to 0) and make sure that number of onChange calls equal to 2
        await decreaseClick(user);

        expect(onChangeMock).toBeCalledTimes(2);
        expect(onChangeMock).toBeCalledWith(0);
        expect(inputButton).toHaveAttribute('value', '0');
    });

    it('should react on stepUp click', async () => {
        const user = userEvent.setup();
        view = render(<NumericStepper onChange={onChangeMock} step={2} />);
        const inputButton = screen.getByRole('spinbutton');

        // Increase by 2 (to equal to 2) and make sure that number of onChange calls equal to 1
        await increaseClick(user);

        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(2);
        expect(inputButton).toHaveAttribute('value', '2');

        // Increase by 2 (to equal to 4) and make sure that number of onChange calls equal to 2
        await increaseClick(user);

        expect(onChangeMock).toBeCalledTimes(2);
        expect(onChangeMock).toBeCalledWith(4);
        expect(inputButton).toHaveAttribute('value', '4');
    });

    it('should disable buttons when limits are reached', async () => {
        const user = userEvent.setup();
        view = render(
            <NumericStepper onChange={onChangeMock} minValue={1} maxValue={3} defaultValue={2} />
        );
        const inputButton = screen.getByRole('spinbutton');
        const stepperButtons = screen.getAllByRole('button');

        // Simulate two clicks on stepUp button
        await increaseClick(user);

        expect(inputButton).toHaveAttribute('value', '3');
        expect(onChangeMock).toBeCalledTimes(1);
        expect(stepperButtons[1]).toHaveAttribute('disabled');
        expect(stepperButtons[0]).not.toHaveAttribute('disabled');

        // Simulate two clicks on stepDown button
        await decreaseClick(user);

        expect(onChangeMock).toBeCalledTimes(2);

        await decreaseClick(user);

        expect(onChangeMock).toBeCalledTimes(3);
        expect(inputButton).toHaveAttribute('value', '1');
        expect(stepperButtons[0]).toHaveAttribute('disabled');
        expect(stepperButtons[1]).not.toHaveAttribute('disabled');
    });

    it('should set bottom edge value if user enters value below allowed limit', async () => {
        const user = userEvent.setup();
        view = render(<NumericStepper onChange={onChangeMock} minValue={10} />);
        const inputButton = screen.getByRole('spinbutton');

        await user.type(inputButton, '9');

        expect(inputButton).toHaveAttribute('value', '10');
    });

    it('should set top edge value if user enters value above allowed limit', async () => {
        const user = userEvent.setup();
        view = render(<NumericStepper onChange={onChangeMock} maxValue={10} />);
        const inputButton = screen.getByRole('spinbutton');

        await user.type(inputButton, '11');
        await inputButton.blur();

        expect(inputButton).toHaveAttribute('value', '10');
    });

    it('should set value to the previous one when user enters invalid value', async () => {
        const user = userEvent.setup();
        view = render(
            <NumericStepper onChange={onChangeMock} minValue={2} maxValue={4} defaultValue={3} />
        );

        await increaseClick(user);

        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(4);
        expect(screen.getByRole('spinbutton')).toHaveAttribute('value', '4');

        const inputButton = screen.getByRole('spinbutton');
        // Imagine users enters empty string
        await user.type(inputButton, '   ');

        await inputButton.blur();

        expect(inputButton).toHaveAttribute('value', '4');
    });

    it('should correctly react on increase click when top edge is overstepped', async () => {
        const user = userEvent.setup();
        view = render(
            <NumericStepper onChange={onChangeMock} step={2} maxValue={4} defaultValue={3} />
        );

        await increaseClick(user);

        expect(onChangeMock).toBeCalledWith(4);
        expect(screen.getByRole('spinbutton')).toHaveAttribute('value', '4');
        expect(onChangeMock).toHaveBeenCalledWith(4);
    });

    it('should correctly react on decrease click when bottom edge is overstepped', async () => {
        const user = userEvent.setup();
        view = render(
            <NumericStepper onChange={onChangeMock} step={2} minValue={3} defaultValue={4} />
        );

        await decreaseClick(user);

        expect(onChangeMock).toBeCalledWith(3);
        expect(screen.getByRole('spinbutton')).toHaveAttribute('value', '3');
        expect(onChangeMock).toHaveBeenCalledWith(3);
    });

    it('should decrease value on keyboard interaction', async () => {
        const user = userEvent.setup();
        view = render(
            <NumericStepper
                onChange={onChangeMock}
                step={1}
                minValue={0}
                maxValue={10}
                defaultValue={4}
            />
        );

        const input = screen.getByRole('spinbutton');
        await input.focus();
        await screen.getAllByRole('button')[0].focus();
        await user.keyboard('[ENTER]');

        expect(onChangeMock).toBeCalledTimes(1);
        expect(input).toHaveAttribute('value', '3');
    });

    it('should increase value on keyboard interaction', async () => {
        const user = userEvent.setup();
        view = render(
            <NumericStepper
                onChange={onChangeMock}
                step={1}
                minValue={0}
                maxValue={10}
                defaultValue={4}
            />
        );

        const input = screen.getByRole('spinbutton');
        await input.focus();
        await screen.getAllByRole('button')[1].focus();
        await user.keyboard('[ENTER]');

        expect(onChangeMock).toBeCalledTimes(1);
        expect(input).toHaveAttribute('value', '5');
    });

    describe('when props change', () => {
        beforeEach(() => {
            view = render(
                <NumericStepper
                    onChange={onChangeMock}
                    step={2}
                    minValue={3}
                    maxValue={10}
                    defaultValue={6}
                />
            );
        });

        it('should set the displayed value to the defaultValue', () => {
            const inputButton = screen.getByRole('spinbutton');
            expect(inputButton).toHaveAttribute('value', '6');

            view.rerender(
                <NumericStepper
                    onChange={onChangeMock}
                    step={2}
                    minValue={3}
                    maxValue={10}
                    defaultValue={7}
                />
            );

            expect(inputButton).toHaveAttribute('value', '7');
        });

        it('should set the displayed value to max allowed if it set to lower then current value', () => {
            const inputButton = screen.getByRole('spinbutton');
            expect(inputButton).toHaveAttribute('value', '6');

            view.rerender(
                <NumericStepper
                    onChange={onChangeMock}
                    step={2}
                    minValue={3}
                    maxValue={5}
                    defaultValue={6}
                />
            );

            expect(inputButton).toHaveAttribute('value', '5');
        });

        it('should set the displayed value to min allowed if it set to higher then current value', () => {
            const inputButton = screen.getByRole('spinbutton');
            expect(inputButton).toHaveAttribute('value', '6');

            view.rerender(
                <NumericStepper
                    onChange={onChangeMock}
                    step={2}
                    minValue={8}
                    maxValue={10}
                    defaultValue={6}
                />
            );

            expect(inputButton).toHaveAttribute('value', '8');
        });
    });
});
