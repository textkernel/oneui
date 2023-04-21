import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { StepperButton } from '../StepperButton';

describe('<StepperButton> component', () => {
    let view;

    it('should render correctly', () => {
        view = render(<StepperButton icon="plus" />);

        expect(view.asFragment()).toMatchSnapshot();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('should render all icons correctly', () => {
        view = render(<StepperButton icon="plus" />);

        expect(screen.getByTitle('plus')).toBeInTheDocument();
        expect(screen.queryByTitle('minus')).not.toBeInTheDocument();

        view.rerender(<StepperButton icon="minus" />);

        expect(screen.queryByTitle('plus')).not.toBeInTheDocument();
        expect(screen.getByTitle('minus')).toBeInTheDocument();
    });
    it('should set default attribute to button if disabled prop is set', () => {
        view = render(<StepperButton icon="plus" disabled />);

        expect(screen.getByRole('button')).toBeDisabled();
    });
});
