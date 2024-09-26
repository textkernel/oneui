import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input, Props } from '../Input';

const defaultProps: Props = {
    label: 'Input Label',
    type: 'text',
    helperText: 'This is a helper text',
    context: undefined,
};

const renderComponent = (props = {}) => render(<Input {...defaultProps} {...props} />);

describe('<Input> that renders an input field', () => {
    let view: RenderResult;

    it('should render default input correctly', () => {
        const onChange = jest.fn();
        view = renderComponent({ value: 'Some value', onChange });
        const textbox = screen.getByRole('textbox');

        expect(view.container).toMatchSnapshot();
        expect(textbox).toBeInTheDocument();
        expect(textbox).not.toHaveAttribute('disabled');
    });

    it('should add classes when props are changed', () => {
        view = renderComponent({
            context: 'critical',
            isBlock: true,
            disabled: true,
        });
        const textbox = screen.getByRole('textbox');

        expect(view.container).toMatchSnapshot();
        expect(textbox).toBeInTheDocument();
        expect(textbox).toHaveClass(
            'Input Input--context_critical Input--size_medium Input--isBlock'
        );
        expect(textbox).toHaveAttribute('disabled');
    });

    it('should render input with label', () => {
        const label = 'Input Label';
        view = renderComponent({ label });
        const labelText = screen.getByText(label);

        expect(labelText).toBeInTheDocument();
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('should show helper text when provided', () => {
        const helperText = 'This is helper text';
        view = renderComponent({
            helperText,
        });
        const helperTextElement = screen.getByText(helperText);

        expect(helperTextElement).toBeInTheDocument();
        expect(helperTextElement).toHaveClass('Input__helperText');
    });

    it('should display errorMessage instead of helper text when context is critical', () => {
        const helperText = 'This is helper text';
        const errorMessage = 'Value is invalid';
        view = renderComponent({
            context: 'critical',
            errorMessage,
            helperText,
        });

        const errorMessageElement = screen.getByText(errorMessage);
        expect(errorMessageElement).toBeInTheDocument();
        expect(errorMessageElement).toHaveClass('Input__errorMessage');

        expect(screen.queryByText(helperText)).not.toBeInTheDocument();
    });

    it('should handle readOnly state correctly', () => {
        view = renderComponent({ readOnly: true });

        const textbox = screen.getByRole('textbox');

        expect(textbox).toHaveAttribute('readOnly');
    });

    it('should call change callback correctly', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        view = renderComponent({ onChange });

        await user.type(screen.getByRole('textbox'), 'test');

        expect(onChange).toHaveBeenCalled();
    });

    it('should add string html attributes correctly', () => {
        view = renderComponent({ 'data-test': 'something' });

        expect(screen.getByRole('textbox')).toHaveAttribute('data-test', 'something');
    });
});
