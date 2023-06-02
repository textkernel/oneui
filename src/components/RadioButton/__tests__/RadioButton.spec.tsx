import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RadioButton } from '../RadioButton';

describe('<RadioButton> that renders a radio button', () => {
    let view: RenderResult;

    it('should render default radio button correctly', () => {
        view = render(<RadioButton id="c1" />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('radio', { name: '' })).toBeInTheDocument();
    });

    it('should render radio button with props and children correctly', () => {
        view = render(
            <RadioButton id="c1" name="group_name">
                Choose me
            </RadioButton>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('radio', { name: 'Choose me' })).toBeInTheDocument();
    });

    it('should call onChange function when clicked', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        view = render(
            <RadioButton id="c2" onChange={onChange}>
                Choose me
            </RadioButton>
        );

        await user.click(screen.getByRole('radio'));

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should rendered disabled radio button correctly', () => {
        view = render(
            <RadioButton id="c3" disabled>
                Useless radio button
            </RadioButton>
        );

        const radioButton = screen.getByRole('radio');

        expect(view.container).toMatchSnapshot();
        expect(radioButton).toBeInTheDocument();
        expect(radioButton).toHaveAttribute('disabled');
    });
});
