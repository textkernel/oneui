import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input } from '../Input';

describe('<Input> that renders an input field', () => {
    let view: RenderResult;

    it('should render default input correctly', () => {
        view = render(<Input value="Some value" />);
        const inputButton = screen.getByRole('textbox');

        expect(view.container).toMatchSnapshot();
        expect(inputButton).toBeInTheDocument();
        expect(inputButton).not.toHaveAttribute('disabled');
    });

    it('should add classes when props are changed', () => {
        view = render(<Input context="danger" size="large" isBlock disabled />);
        const inputButton = screen.getByRole('textbox');

        expect(view.container).toMatchSnapshot();
        expect(inputButton).toBeInTheDocument();
        expect(inputButton).toHaveClass(
            'Input Input--context_danger Input--size_large Input--isBlock'
        );
        expect(inputButton).toHaveAttribute('disabled');
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
