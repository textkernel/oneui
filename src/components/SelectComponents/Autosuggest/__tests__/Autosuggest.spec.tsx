import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Autosuggest } from '../Autosuggest';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../../AutosuggestDeprecated/__mocks__/suggestions';

describe('Autosuggest', () => {
    const suggestionToString = SUGGESTION_TO_STRING;
    const inputPlaceholder = 'type here...';
    const numberOfVisibleTags = 3;
    const mockOnSelectionAdd = jest.fn();
    const mockOnSelectionRemove = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnBlur = jest.fn();

    let suggestionsList = [];
    let selectedSuggestions = [];

    let view;
    let inputNodeField;

    const setFocusOnInput = (inputNode) => {
        expect(inputNode).toBeDefined();
        fireEvent.click(inputNode);
    };

    beforeEach(() => {
        view = render(
            <Autosuggest
                isLoading={false}
                selectedSuggestions={selectedSuggestions}
                suggestions={suggestionsList}
                suggestionToString={suggestionToString}
                inputPlaceholder={inputPlaceholder}
                onSelectionAdd={mockOnSelectionAdd}
                onSelectionRemove={mockOnSelectionRemove}
                onInputValueChange={mockOnInputValueChange}
                numberOfVisibleTags={numberOfVisibleTags}
                onBlur={mockOnBlur}
            />
        );
        inputNodeField = screen.getByRole('textbox');
    });

    afterEach(() => {
        suggestionsList = [];
        selectedSuggestions = [];
        view.unmount();
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should add additional attributes to input field when component is blurred', () => {
            view.rerender(
                <Autosuggest
                    isLoading={false}
                    selectedSuggestions={selectedSuggestions}
                    suggestions={suggestionsList}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onSelectionRemove={mockOnSelectionRemove}
                    onInputValueChange={mockOnInputValueChange}
                    numberOfVisibleTags={numberOfVisibleTags}
                    onBlur={mockOnBlur}
                    inputAttrs={{ 'data-test': true, title: 'some title' }}
                />
            );
            const inputField = view.container.querySelector('input') as Element;

            expect(inputField.outerHTML).toMatch('data-test="true"');
            expect(inputField.outerHTML).toMatch('title="some title"');
        });
        it('should initially render focused component correctly', () => {
            setFocusOnInput(inputNodeField);
            expect(view.asFragment()).toMatchSnapshot();
            expect(view.container.querySelectorAll('.ListItem')).toHaveLength(0);
        });
        it('should add additional attributes to input field when component is focused', () => {
            view.rerender(
                <Autosuggest
                    isLoading={false}
                    selectedSuggestions={selectedSuggestions}
                    suggestions={suggestionsList}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onSelectionRemove={mockOnSelectionRemove}
                    onInputValueChange={mockOnInputValueChange}
                    numberOfVisibleTags={numberOfVisibleTags}
                    onBlur={mockOnBlur}
                    inputAttrs={{ 'data-test': true, title: 'some title' }}
                />
            );
            const inputField = view.container.querySelector('input') as Element;

            setFocusOnInput(inputField);
            expect(inputField.outerHTML).toMatch('data-test="true"');
            expect(inputField.outerHTML).toMatch('title="some title"');
        });
        it('should initially render focused component with suggestions list correctly', () => {
            suggestionsList = SUGGESTIONS.slice(0, 8);
            view.rerender(
                <Autosuggest
                    isLoading={false}
                    selectedSuggestions={selectedSuggestions}
                    suggestions={suggestionsList}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onSelectionRemove={mockOnSelectionRemove}
                    onInputValueChange={mockOnInputValueChange}
                    numberOfVisibleTags={numberOfVisibleTags}
                    onBlur={mockOnBlur}
                    inputAttrs={{ 'data-test': true, title: 'some title' }}
                />
            );
            setFocusOnInput(inputNodeField);
            expect(view.asFragment()).toMatchSnapshot();
            const listItem = view.container.querySelectorAll('li');
            expect(listItem).toHaveLength(8);
        });
        it('should render component with suggestions', () => {
            suggestionsList = SUGGESTIONS.slice(1, 20);
            view.rerender(
                <Autosuggest
                    isLoading={false}
                    selectedSuggestions={selectedSuggestions}
                    suggestions={suggestionsList}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onSelectionRemove={mockOnSelectionRemove}
                    onInputValueChange={mockOnInputValueChange}
                    numberOfVisibleTags={numberOfVisibleTags}
                    onBlur={mockOnBlur}
                    inputAttrs={{ 'data-test': true, title: 'some title' }}
                />
            );
            setFocusOnInput(inputNodeField);
            fireEvent.change(inputNodeField, { target: { value: 'driver' } });
            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should render isLoading state', () => {
            suggestionsList = SUGGESTIONS.slice(1, 20);
            view.rerender(
                <Autosuggest
                    isLoading
                    selectedSuggestions={selectedSuggestions}
                    suggestions={[]}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onSelectionRemove={mockOnSelectionRemove}
                    onInputValueChange={mockOnInputValueChange}
                    numberOfVisibleTags={numberOfVisibleTags}
                    onBlur={mockOnBlur}
                    inputAttrs={{ 'data-test': true, title: 'some title' }}
                />
            );
            setFocusOnInput(inputNodeField);
            fireEvent.change(inputNodeField, { target: { value: 'driver' } });
            expect(view.container.querySelectorAll('.SuggestionsList__loaderItem')).toHaveLength(5);
            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should render mix suggestions and loader if allowMixingSuggestionsAndLoading is set to true', () => {
            suggestionsList = SUGGESTIONS.slice(1, 3);
            view.rerender(
                <Autosuggest
                    isLoading
                    selectedSuggestions={selectedSuggestions}
                    suggestions={suggestionsList}
                    suggestionToString={suggestionToString}
                    inputPlaceholder={inputPlaceholder}
                    onSelectionAdd={mockOnSelectionAdd}
                    onSelectionRemove={mockOnSelectionRemove}
                    onInputValueChange={mockOnInputValueChange}
                    numberOfVisibleTags={numberOfVisibleTags}
                    onBlur={mockOnBlur}
                    allowMixingSuggestionsAndLoading
                />
            );
            setFocusOnInput(inputNodeField);
            fireEvent.change(inputNodeField, { target: { value: 'driver' } });
            expect(view.container.querySelectorAll('.ListItem')).toHaveLength(7);
            expect(view.container.querySelectorAll('.SuggestionsList__loaderItem')).toHaveLength(5);
        });
        it('should render empty component correctly when focused', async () => {
            expect(view.asFragment()).toMatchSnapshot();
            setFocusOnInput(inputNodeField);
            expect(document.activeElement).toBe(inputNodeField);
        });
    });
});
