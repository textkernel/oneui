import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from '../Input';

describe('<Input> that renders an input field', () => {
    let view: RenderResult;

    it('should render default input correctly', () => {
        const onChange = jest.fn();
        view = render(<Input value="Some value" onChange={onChange} />);
        const textbox = screen.getByRole('textbox');

        expect(view.container).toMatchSnapshot();
        expect(textbox).toBeInTheDocument();
        expect(textbox).not.toHaveAttribute('disabled');
    });

    it('should add classes when props are changed', () => {
        view = render(<Input context="critical" isBlock disabled />);
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
        view = render(<Input label={label} />);
        const labelText = screen.getByText(label);

        expect(labelText).toBeInTheDocument();
        expect(labelText).toHaveAttribute('for', 'input-field');
    });

    it('should show helper text when provided', () => {
        const helperText = 'This is helper text';
        view = render(<Input helperText={helperText} context="critical" />);
        const helperTextElement = screen.getByText(helperText);

        expect(helperTextElement).toBeInTheDocument();
        expect(helperTextElement).toHaveClass('Input__helperText--context_critical');
    });

    it('should handle readOnly state correctly', () => {
        view = render(<Input readOnly />);
        const textbox = screen.getByRole('textbox');

        expect(textbox).toHaveAttribute('readOnly');
    });

    it('should call change callback correctly', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        view = render(<Input onChange={onChange} />);

        await user.type(screen.getByRole('textbox'), 'test');

        expect(onChange).toHaveBeenCalled();
    });

    it('should add string html attributes correctly', () => {
        view = render(<Input data-test="something" />);

        expect(screen.getByRole('textbox')).toHaveAttribute('data-test', 'something');
    });
});
