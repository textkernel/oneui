import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const selectedSuggestions = [];

    let view;
    let inputNodeField;

    const setFocus = async () => userEvent.click(screen.getByRole('listbox'));

    const defaultProps = {
        selectedSuggestions,
        suggestions: suggestionsList,
        suggestionToString,
        inputPlaceholder,
        onSelectionAdd: mockOnSelectionAdd,
        onSelectionRemove: mockOnSelectionRemove,
        onInputValueChange: mockOnInputValueChange,
        numberOfVisibleTags,
        onBlur: mockOnBlur,
    };

    const rerenderView = (props) => {
        view.rerender(<Autosuggest {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        view = render(<Autosuggest {...defaultProps} />);
        inputNodeField = screen.getByRole('textbox');
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should add additional attributes to input field when component is blurred', () => {
            const newProps = {
                isLoading: false,
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            const inputField = screen.getAllByRole('textbox')[0];

            expect(inputField.outerHTML).toMatch('data-test="true"');
            expect(inputField.outerHTML).toMatch('title="some title"');
        });
        it('should initially render focused component correctly', async () => {
            const newProps = {
                suggestions: [],
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            await setFocus();

            expect(view.asFragment()).toMatchSnapshot();
            expect(screen.queryAllByRole('presentation')).toHaveLength(0);
        });
        it('should add additional attributes to input field when component is focused', async () => {
            const newProps = {
                isLoading: false,
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            const inputField = screen.getAllByRole('textbox')[0];
            await setFocus();

            expect(inputField.outerHTML).toMatch('data-test="true"');
            expect(inputField.outerHTML).toMatch('title="some title"');
        });
        it('should initially render focused component with suggestions list correctly', async () => {
            suggestionsList = SUGGESTIONS.slice(0, 8);
            const newProps = {
                isLoading: false,
                suggestions: suggestionsList,
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            await setFocus();

            expect(view.asFragment()).toMatchSnapshot();
            expect(screen.getAllByRole('presentation')).toHaveLength(8);
        });
        it('should render component with suggestions', async () => {
            suggestionsList = SUGGESTIONS.slice(1, 20);
            const newProps = {
                isLoading: false,
                suggestions: suggestionsList,
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            await setFocus();
            await userEvent.type(inputNodeField, 'driver');

            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should render isLoading state', async () => {
            suggestionsList = SUGGESTIONS.slice(1, 20);
            const newProps = {
                isLoading: true,
                inputAttrs: { 'data-test': true, title: 'some title' },
            };
            rerenderView(newProps);
            await setFocus();
            await userEvent.type(inputNodeField, 'driver');

            expect(screen.getAllByRole('presentation')).toHaveLength(5);
            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should render mix suggestions and loader if allowMixingSuggestionsAndLoading is set to true', async () => {
            suggestionsList = SUGGESTIONS.slice(1, 3);
            const newProps = {
                isLoading: true,
                suggestions: suggestionsList,
                allowMixingSuggestionsAndLoading: true,
            };
            rerenderView(newProps);
            await setFocus();
            await userEvent.type(inputNodeField, 'driver');

            expect(screen.getAllByRole('presentation')).toHaveLength(7);
            expect(screen.getAllByRole('group')).toHaveLength(5);
        });
        it('should render empty component correctly when focused', async () => {
            expect(view.asFragment()).toMatchSnapshot();
            await setFocus();

            expect(document.activeElement).toBe(inputNodeField);
        });
    });
});
