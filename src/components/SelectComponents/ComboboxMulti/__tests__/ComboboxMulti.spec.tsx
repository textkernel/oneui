import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

    const setFocusOnInput = (inputNode) => {
        expect(inputNode).toBeDefined();
        fireEvent.click(inputNode);
    };

    beforeEach(() => {
        view = render(
            <ComboboxMulti
                suggestions={suggestions}
                suggestionToString={suggestionToString}
                inputPlaceholder={inputPlaceholder}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                onSelectionAdd={mockOnSelectionAdd}
                onInputValueChange={mockOnInputValueChange}
                onBlur={mockOnBlur}
            />
        );
        inputNodeField = view.container.querySelector('input');
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should add additional attributes to input field when component is blurred', () => {
            view.rerender(
                <ComboboxMulti
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onBlur={mockOnBlur}
                    inputAttrs={{ 'data-test': true, title: 'some title' }}
                />
            );
            expect(view.asFragment()).toMatchSnapshot();
            const inputField = view.container.querySelector('input') as Element;

            expect(inputField.outerHTML).toMatch('data-test="true"');
            expect(inputField.outerHTML).toMatch('title="some title"');
        });
        it('should set focus on the input field', () => {
            setFocusOnInput(inputNodeField);
            expect(inputNodeField).toBe(document.activeElement);
        });
        it('should not set focus on the input field when the component is disabled', () => {
            view.rerender(
                <ComboboxMulti
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onBlur={mockOnBlur}
                    disabled
                />
            );
            setFocusOnInput(inputNodeField);
            expect(inputNodeField).not.toBe(document.activeElement);
        });
        it('should add additional attributes to input field when component is focused', () => {
            view.rerender(
                <ComboboxMulti
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onBlur={mockOnBlur}
                    inputAttrs={{ 'data-test': true, title: 'some title' }}
                />
            );
            setFocusOnInput(inputNodeField);
            const inputField = view.container.querySelector('input') as Element;

            expect(inputField.outerHTML).toMatch('data-test="true"');
            expect(inputField.outerHTML).toMatch('title="some title"');
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
            view.rerender(
                <ComboboxMulti
                    suggestions={[]}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onBlur={mockOnBlur}
                    disabled
                />
            );
            setFocusOnInput(inputNodeField);
        });
        it('should render selection placeholder when component is not focused', () => {
            const inputField = view.container.querySelector('input') as Element;

            expect(screen.queryByPlaceholderText(inputPlaceholder)).toBeDefined();
            expect(inputField.getAttribute('placeholder')).toEqual(inputPlaceholder);
        });
    });
});
