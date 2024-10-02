import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Input, Props } from '../Input';
import { SearchInput } from '../SearchInput';

const defaultProps: Props = {
    label: 'Input Label',
    type: 'text',
    helperText: 'This is a helper text',
    context: undefined,
};

const renderInputComponent = (props = {}) => render(<Input {...defaultProps} {...props} />);
const renderSearchInputComponent = (props = {}) =>
    render(<SearchInput {...defaultProps} {...props} />);

describe('<Input> that renders an input field', () => {
    let view: RenderResult;

    it('should render default input correctly', () => {
        const onChange = jest.fn();
        view = renderInputComponent({ value: 'Some value', onChange });
        const textbox = screen.getByRole('textbox');

        expect(view.container).toMatchSnapshot();
        expect(textbox).toBeInTheDocument();
        expect(textbox).not.toHaveAttribute('disabled');
    });

    it('should add classes when props are changed', () => {
        view = renderInputComponent({
            context: 'critical',
            isBlock: true,
            disabled: true,
        });
        const textbox = screen.getByRole('textbox');
        const inputContainer = screen.getByTestId('inputContainer');

        expect(view.container).toMatchSnapshot();
        expect(textbox).toBeInTheDocument();
        expect(textbox).toHaveClass('Input__input Input__input--size_medium');
        expect(inputContainer).toHaveClass('Input__inputContainer--context_critical');
        expect(textbox).toHaveAttribute('disabled');
    });

    it('should render input with label', () => {
        const label = 'Input Label';
        view = renderInputComponent({ label });
        const labelText = screen.getByText(label);

        expect(labelText).toBeInTheDocument();
        expect(screen.getByLabelText(label)).toBeInTheDocument();
    });

    it('should show helper text when provided', () => {
        const helperText = 'This is helper text';
        view = renderInputComponent({
            helperText,
        });
        const helperTextElement = screen.getByText(helperText);

        expect(helperTextElement).toBeInTheDocument();
        expect(helperTextElement).toHaveClass('Input__helperText');
    });

    it('should display errorMessage instead of helper text when context is critical', () => {
        const helperText = 'This is helper text';
        const errorMessage = 'Value is invalid';
        view = renderInputComponent({
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
        view = renderInputComponent({ readOnly: true });

        const textbox = screen.getByRole('textbox');

        expect(textbox).toHaveAttribute('readOnly');
    });

    it('should call change callback correctly', async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        view = renderInputComponent({ onChange });

        await user.type(screen.getByRole('textbox'), 'test');

        expect(onChange).toHaveBeenCalled();
    });

    it('should add string html attributes correctly', () => {
        view = renderInputComponent({ 'data-test': 'something' });

        expect(screen.getByRole('textbox')).toHaveAttribute('data-test', 'something');
    });
});

describe('<SearchInput> that renders an input field', () => {
    it('should render default SearchInput correctly', () => {
        const view = renderSearchInputComponent({ value: 'Some value!' });
        const textbox = screen.getByRole('textbox');

        expect(view.container).toMatchSnapshot();
        expect(textbox).toBeInTheDocument();
        expect(textbox).not.toHaveAttribute('disabled');
    });

    it('should add classes when props are changed', () => {
        const view = renderSearchInputComponent({
            context: 'critical',
            errorMessage: 'error message',
            isBlock: true,
            disabled: true,
        });
        const input = screen.getByRole('textbox');
        const inputContainer = screen.getByTestId('inputContainer');

        expect(input).toHaveAttribute('disabled');

        expect(view.container).toMatchSnapshot();
        expect(inputContainer).toBeInTheDocument();
        expect(inputContainer).toHaveClass(
            'Input__inputContainer Input__inputContainer--context_critical Input__inputContainer--isBlock Input__inputContainer--disabled'
        );
    });

    it('should render the search icon bold when there is a value', () => {
        renderSearchInputComponent({ value: 'Some value' });

        const searchIcon = screen.getAllByTestId('default-icon')[0];
        expect(searchIcon).toHaveClass('Input__icon--bold');
    });
    it('should not render the search icon bold when there is a value', () => {
        renderSearchInputComponent({});

        const searchIcon = screen.getAllByTestId('default-icon')[0];
        expect(searchIcon).not.toHaveClass('Input__icon--bold');
    });

    it('should not show the clear icon when there is no value', () => {
        renderSearchInputComponent({});

        const clearIcon = screen.getAllByTestId('default-icon')[1];
        expect(clearIcon).not.toHaveClass('Input__icon--visible');
    });
    it('should show the clear icon when there is a value', () => {
        renderSearchInputComponent({ value: 'Some value' });

        const clearIcon = screen.getAllByTestId('default-icon')[1];
        expect(clearIcon).toHaveClass('Input__icon--visible');
    });

    it('should delete value when clear icon is clicked', async () => {
        const user = userEvent.setup();
        renderSearchInputComponent({ value: 'Some value' });
        expect(screen.getByRole('textbox')).toHaveValue('Some value');

        await user.click(screen.getAllByTestId('default-icon')[1]);

        expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('should change value correctly', async () => {
        const user = userEvent.setup();
        renderSearchInputComponent({});
        expect(screen.getByRole('textbox')).toHaveValue('');

        await user.type(screen.getByRole('textbox'), 'test');
        expect(screen.getByRole('textbox')).toHaveValue('test');
    });

    it('should handle readOnly state correctly', () => {
        renderSearchInputComponent({ readOnly: true });

        const textbox = screen.getByRole('textbox');

        expect(textbox).toHaveAttribute('readOnly');
    });
});
