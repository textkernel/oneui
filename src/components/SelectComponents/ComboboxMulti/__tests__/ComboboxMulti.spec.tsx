import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ComboboxMulti } from '../ComboboxMulti';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../../AutosuggestDeprecated/__mocks__/suggestions';

describe('ComboboxMulti', () => {
    const suggestionToString = SUGGESTION_TO_STRING;
    const inputPlaceholder = 'type here...';
    const noSuggestionsPlaceholder = 'No suggestions...';
    const upArrowLabel = 'up arrow';
    const downArrowLabel = 'down arrow';
    const mockOnSelectionAdd = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnBlur = jest.fn();

    const suggestions = SUGGESTIONS;

    let view;
    let inputNodeField;

    const setFocus = async (user) => user.click(screen.getByRole('listbox'));

    const defaultProps = {
        suggestions,
        suggestionToString,
        inputPlaceholder,
        noSuggestionsPlaceholder,
        downArrowLabel,
        upArrowLabel,
        onSelectionAdd: mockOnSelectionAdd,
        onInputValueChange: mockOnInputValueChange,
        onBlur: mockOnBlur,
    };
    const rerenderView = (props) => {
        view.rerender(<ComboboxMulti {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        view = render(<ComboboxMulti {...defaultProps} />);
        inputNodeField = screen.getByRole('textbox');
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.getByLabelText(downArrowLabel)).toBeInTheDocument();
        });

        it('should add additional attributes to input field when component is blurred', () => {
            const newProps = {
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);

            expect(view.container).toMatchSnapshot();
            const inputField = screen.getAllByRole('textbox')[0];

            expect(inputField).toHaveAttribute('data-test', 'true');
            expect(inputField).toHaveAttribute('title', 'some title');
        });

        it('should set focus on the input field', async () => {
            const user = userEvent.setup();
            await setFocus(user);

            expect(inputNodeField).toBe(document.activeElement);
        });

        it('should not set focus on the input field when the component is disabled', async () => {
            const user = userEvent.setup();
            const newProps = {
                disabled: true,
            };
            rerenderView(newProps);
            await setFocus(user);

            expect(inputNodeField).not.toBe(document.activeElement);
        });

        it('should add additional attributes to input field when component is focused', async () => {
            const user = userEvent.setup();
            const newProps = {
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            await setFocus(user);
            const inputField = screen.getAllByRole('textbox')[0];

            expect(inputField).toHaveAttribute('data-test', 'true');
            expect(inputField).toHaveAttribute('title', 'some title');
        });

        it('should render noSuggestions placeholder when empty suggestions list is passed', async () => {
            const user = userEvent.setup();
            const newProps = {
                suggestions: [],
            };
            rerenderView(newProps);
            await setFocus(user);

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole('option')).not.toBeInTheDocument();
            expect(screen.getByRole('listitem')).toBeInTheDocument();
            expect(screen.getByText(noSuggestionsPlaceholder)).toBeInTheDocument();
        });

        it('should render selection placeholder when component is not focused', () => {
            const inputField = screen.getAllByRole('textbox')[0];

            expect(screen.queryByPlaceholderText(inputPlaceholder)).toBeInTheDocument();
            expect(inputField.getAttribute('placeholder')).toEqual(inputPlaceholder);
        });
    });
});
