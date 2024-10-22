import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SearchInput, SearchInputProps } from '../SearchInput';

const defaultProps: SearchInputProps = {
    label: 'Input Label',
    helperText: 'This is a helper text',
    context: undefined,
};

const renderSearchInputComponent = (props = {}) =>
    render(<SearchInput {...defaultProps} {...props} />);

describe('<SearchInput> that renders an input field', () => {
    it('should render default SearchInput correctly', () => {
        const view = renderSearchInputComponent({ value: 'Some value!' });
        const textbox = screen.getByRole('searchbox');

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
        const input = screen.getByRole('searchbox');
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
        expect(searchIcon).toHaveClass('SearchInput__icon--bold');
    });
    it('should not render the search icon bold when there is no value', () => {
        renderSearchInputComponent({});

        const searchIcon = screen.getAllByTestId('default-icon')[0];
        expect(searchIcon).not.toHaveClass('SearchInput__icon--bold');
    });

    it('should not show the clear icon when there is no value', () => {
        renderSearchInputComponent({});

        const clearIcon = screen.getAllByTestId('default-icon')[1];
        expect(clearIcon).not.toHaveClass('SearchInput__icon--visible');
    });
    it('should show the clear icon when there is a value', () => {
        renderSearchInputComponent({ value: 'Some value' });

        const clearIcon = screen.getAllByTestId('default-icon')[1];
        expect(clearIcon).toHaveClass('SearchInput__icon--visible');
    });

    it('should delete value when clear icon is clicked', async () => {
        const user = userEvent.setup();
        const handleChangeMock = jest.fn();
        renderSearchInputComponent({ value: 'Some value', onChange: handleChangeMock });
        expect(screen.getByRole('searchbox')).toHaveValue('Some value');

        await user.click(screen.getAllByTestId('default-icon')[1]);

        expect(handleChangeMock).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('searchbox')).toHaveValue(undefined);
    });

    it('should change value correctly', async () => {
        const user = userEvent.setup();
        renderSearchInputComponent({});
        expect(screen.getByRole('searchbox')).toHaveValue('');

        await user.type(screen.getByRole('searchbox'), 'test');
        expect(screen.getByRole('searchbox')).toHaveValue('test');
    });

    it('should handle readOnly state correctly', () => {
        renderSearchInputComponent({ readOnly: true });

        const textbox = screen.getByRole('searchbox');

        expect(textbox).toHaveAttribute('readOnly');
    });
});
