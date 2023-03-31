import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectBase } from '../SelectBase';
import { SuggestionsList } from '../../SuggestionsList';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../../AutosuggestDeprecated/__mocks__/suggestions';

describe('SelectBase', () => {
    const inputRef = React.createRef();
    const suggestions = SUGGESTIONS;
    const suggestionToString = SUGGESTION_TO_STRING;
    const mockOnSelectionAdd = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnClearAllSelected = jest.fn();
    const mockOnBlur = jest.fn();
    const mockRender = jest.fn(({ getInputProps }) => <input {...getInputProps()} />);
    const mockRenderWithRef = jest.fn(({ getInputProps }) => (
        <input ref={inputRef} {...getInputProps()} />
    ));

    let view;
    let inputNode;

    beforeEach(() => {
        view = render(
            <SelectBase
                suggestions={suggestions}
                suggestionToString={suggestionToString}
                listRenderer={(listProps) => <SuggestionsList {...listProps} />}
                focusedRenderer={mockRender}
                blurredRenderer={mockRender}
                onSelectionAdd={mockOnSelectionAdd}
                onInputValueChange={mockOnInputValueChange}
                onClearAllSelected={mockOnClearAllSelected}
                onBlur={mockOnBlur}
                highlightOnEmptyInput
            />
        );
        inputNode = view.container.querySelector('input');
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.asFragment()).toMatchSnapshot();
        });
    });
    describe('with toggle arrow', () => {
        it('should show arrows when showArrow is true', () => {
            view.rerender(
                <SelectBase
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    listRenderer={(listProps) => <SuggestionsList {...listProps} />}
                    focusedRenderer={mockRender}
                    blurredRenderer={mockRender}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onClearAllSelected={mockOnClearAllSelected}
                    onBlur={mockOnBlur}
                    highlightOnEmptyInput
                    showArrow
                />
            );
            expect(view.asFragment()).toMatchSnapshot();

            expect(view.container.querySelector('svg')).toBeDefined();
        });
        it('should toggle focus and the arrow when it is clicked', () => {
            view.rerender(
                <SelectBase
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    listRenderer={(listProps) => <SuggestionsList {...listProps} />}
                    focusedRenderer={mockRender}
                    blurredRenderer={mockRender}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onClearAllSelected={mockOnClearAllSelected}
                    onBlur={mockOnBlur}
                    highlightOnEmptyInput
                    showArrow
                />
            );
            expect(view.asFragment()).toMatchSnapshot();
            const svg = view.container.querySelector('svg');

            expect(svg).toBeDefined();
            fireEvent.click(svg);
            expect(svg).toBeDefined();
            fireEvent.click(svg);
            expect(svg).toBeDefined();
        });
    });
    describe('search field interactions', () => {
        it('should set focus when wrapper element is clicked', () => {
            const focusSpy = jest.spyOn(inputNode, 'focus');

            expect(inputNode).not.toBe(document.activeElement);
            expect(focusSpy).not.toHaveBeenCalled();

            fireEvent.click(view.container.querySelector('.SelectBase__field'));

            expect(inputNode).toBe(document.activeElement);
            expect(focusSpy).toHaveBeenCalled();
        });
        it('should be able to get a component by ref sent as a prop', () => {
            view.rerender(
                <SelectBase
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    listRenderer={(listProps) => <SuggestionsList {...listProps} />}
                    focusedRenderer={mockRenderWithRef}
                    blurredRenderer={mockRenderWithRef}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onClearAllSelected={mockOnClearAllSelected}
                    onBlur={mockOnBlur}
                    highlightOnEmptyInput
                />
            );

            // expect(view.container.querySelector('input').getElement().ref).toBeTruthy();
        });
        it('should lose focus when suggestion is selected', () => {
            expect(inputNode).not.toBe(document.activeElement);

            fireEvent.click(view.container.querySelector('.SelectBase__field'));
            fireEvent.click(view.container.querySelector('li'));

            expect(view.container.querySelectorAll('li')).toHaveLength(0);
            expect(view.container.querySelector('.FieldWrapper')).toBeDefined();
        });
        it('should stay focused when suggestion is selected with keepExpandedAfterSelection set to true', () => {
            view.rerender(
                <SelectBase
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    listRenderer={(listProps) => <SuggestionsList {...listProps} />}
                    focusedRenderer={mockRender}
                    blurredRenderer={mockRender}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onClearAllSelected={mockOnClearAllSelected}
                    onBlur={mockOnBlur}
                    highlightOnEmptyInput
                    keepExpandedAfterSelection
                />
            );
            expect(inputNode).not.toBe(document.activeElement);

            fireEvent.click(view.container.querySelector('.SelectBase__field'));

            expect(inputNode).toBe(document.activeElement);

            fireEvent.click(view.container.querySelector('li'));
            expect(view.container.querySelectorAll('li')).toHaveLength(suggestions.length);
        });
        it('should clear the input field when a suggestion was selected', () => {
            const textInputValue = 'driver'; // value
            const inputField = view.container.querySelector('input');
            fireEvent.change(inputField, { target: { value: textInputValue } });

            expect(inputField.getAttribute('value')).toBeDefined();
            expect(inputField.getAttribute('value')).toEqual(textInputValue);

            fireEvent.click(view.container.querySelector('li'));

            expect(inputField.getAttribute('value')).toEqual('');
        });
        it('should clear the input field when a suggestion was selected with keepExpandedAfterSelection set to true', () => {
            const textInputValue = 'driver';
            view.rerender(
                <SelectBase
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    listRenderer={(listProps) => <SuggestionsList {...listProps} />}
                    focusedRenderer={mockRender}
                    blurredRenderer={mockRender}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onClearAllSelected={mockOnClearAllSelected}
                    onBlur={mockOnBlur}
                    highlightOnEmptyInput
                    keepExpandedAfterSelection
                />
            );
            const inputField = view.container.querySelector('input');
            fireEvent.change(inputField, { target: { value: textInputValue } });

            expect(inputField.getAttribute('value')).toEqual(textInputValue);

            fireEvent.click(view.container.querySelector('li'));

            expect(inputField.getAttribute('value')).toEqual(textInputValue);
        });
    });
    describe('highlighting', () => {
        it('should highlight first item', () => {
            expect(view.asFragment()).toMatchSnapshot();
            const selectBaseField = view.container.querySelector('.SelectBase__field') as Element;

            expect(selectBaseField).toBeDefined();
        });
    });

    describe('callbacks', () => {
        describe('onSelectionAdd', () => {
            it('should be called on clicking on a suggestion', () => {
                fireEvent.click(view.container.querySelector('.SelectBase__field'));

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                fireEvent.click(view.container.querySelector('li'));

                expect(mockOnSelectionAdd).toHaveBeenCalled();
            });
        });
        it('should call onClearAllSelected on Clear button click', () => {
            const clearTitle = 'Clear';
            view.rerender(
                <SelectBase
                    suggestions={suggestions}
                    suggestionToString={suggestionToString}
                    listRenderer={(listProps) => <SuggestionsList {...listProps} />}
                    focusedRenderer={mockRender}
                    blurredRenderer={mockRender}
                    onSelectionAdd={mockOnSelectionAdd}
                    onInputValueChange={mockOnInputValueChange}
                    onClearAllSelected={mockOnClearAllSelected}
                    onBlur={mockOnBlur}
                    highlightOnEmptyInput
                    showArrow
                    clearTitle={clearTitle}
                    showClearButton
                />
            );
            const clearButton = view.container.querySelector('button') as Element;
            fireEvent.click(clearButton);

            expect(mockOnClearAllSelected).toHaveBeenCalled();
        });
        // Despite everything is working good in real-case scenario,
        // 'blur' event can not be simulated in the way Downshift component to understand it.
        it.skip('should call onBlur', () => {
            fireEvent.click(view.container.querySelector('.SelectBase__field'));

            fireEvent.click(view.container.querySelector('SelectBase'));

            expect(mockOnBlur).toHaveBeenCalled();
        });
        it('should call onInputValueChange when typing into input field', () => {
            expect(mockOnInputValueChange).not.toHaveBeenCalled();

            const inputField = view.container.querySelector('input') as Element;
            fireEvent.change(inputField, { target: { value: 'driver' } });

            expect(mockOnInputValueChange).toHaveBeenCalled();
        });
    });
});
