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
    const mockOnSelectionAdd = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnBlur = jest.fn();

    const suggestions = SUGGESTIONS;

    let view;
    let inputNodeField;

    const setFocus = async () => userEvent.click(screen.getByRole('listbox'));

    const defaultProps = {
        suggestions,
        suggestionToString,
        inputPlaceholder,
        noSuggestionsPlaceholder,
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
            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should add additional attributes to input field when component is blurred', () => {
            const newProps = {
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            expect(view.asFragment()).toMatchSnapshot();
            const inputField = screen.getAllByRole('textbox')[0];

            expect(inputField.outerHTML).toMatch('data-test="true"');
            expect(inputField.outerHTML).toMatch('title="some title"');
        });
        it('should set focus on the input field', async () => {
            await setFocus();

            expect(inputNodeField).toBe(document.activeElement);
        });
        it('should not set focus on the input field when the component is disabled', async () => {
            const newProps = {
                disabled: true,
            };
            rerenderView(newProps);
            await setFocus();

            expect(inputNodeField).not.toBe(document.activeElement);
        });
        it('should add additional attributes to input field when component is focused', async () => {
            const newProps = {
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            await setFocus();
            const inputField = screen.getAllByRole('textbox')[0];

            expect(inputField.outerHTML).toMatch('data-test="true"');
            expect(inputField.outerHTML).toMatch('title="some title"');
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', async () => {
            const newProps = {
                suggestions: [],
            };
            rerenderView(newProps);
            await setFocus();

            expect(view.asFragment()).toMatchSnapshot();
            expect(screen.getAllByRole('presentation')).toHaveLength(1);
            expect(screen.getByText(noSuggestionsPlaceholder)).toBeInTheDocument();
        });
        it('should render selection placeholder when component is not focused', () => {
            const inputField = screen.getAllByRole('textbox')[0];

            expect(screen.queryByPlaceholderText(inputPlaceholder)).toBeInTheDocument();
            expect(inputField.getAttribute('placeholder')).toEqual(inputPlaceholder);
        });
    });
});
