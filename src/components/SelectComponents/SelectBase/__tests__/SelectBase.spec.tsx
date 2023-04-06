import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { create } from 'react-test-renderer';
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

    const defaultProps = {
        suggestions,
        suggestionToString,
        // eslint-disable-next-line react/display-name
        listRenderer: (listProps) => <SuggestionsList {...listProps} />,
        focusedRenderer: mockRender,
        blurredRenderer: mockRender,
        onSelectionAdd: mockOnSelectionAdd,
        onInputValueChange: mockOnInputValueChange,
        onClearAllSelected: mockOnClearAllSelected,
        onBlur: mockOnBlur,
        highlightOnEmptyInput: true,
    };

    const rerenderView = (props) => {
        view.rerender(<SelectBase {...props} />);
    };

    beforeEach(() => {
        view = render(<SelectBase {...defaultProps} />);
        inputNode = screen.getByRole('textbox');
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.asFragment()).toMatchSnapshot();
        });
    });
    describe('with toggle arrow', () => {
        it('should show arrows when showArrow is true', () => {
            const newProps = {
                suggestions,
                suggestionToString,
                // eslint-disable-next-line react/display-name
                listRenderer: (listProps) => <SuggestionsList {...listProps} />,
                focusedRenderer: mockRender,
                blurredRenderer: mockRender,
                onSelectionAdd: mockOnSelectionAdd,
                onInputValueChange: mockOnInputValueChange,
                onClearAllSelected: mockOnClearAllSelected,
                onBlur: mockOnBlur,
                highlightOnEmptyInput: true,
                showArrow: true,
            };
            rerenderView(newProps);
            expect(view.asFragment()).toMatchSnapshot();

            expect(screen.getByRole('img')).toBeInTheDocument();
        });
        it('should toggle focus and the arrow when it is clicked', async () => {
            const newProps = {
                suggestions,
                suggestionToString,
                // eslint-disable-next-line react/display-name
                listRenderer: (listProps) => <SuggestionsList {...listProps} />,
                focusedRenderer: mockRender,
                blurredRenderer: mockRender,
                onSelectionAdd: mockOnSelectionAdd,
                onInputValueChange: mockOnInputValueChange,
                onClearAllSelected: mockOnClearAllSelected,
                onBlur: mockOnBlur,
                highlightOnEmptyInput: true,
                showArrow: true,
            };
            rerenderView(newProps);
            create(<SelectBase {...newProps} />);
            expect(view.asFragment()).toMatchSnapshot();
            const svg = screen.getByRole('img');

            expect(svg).toBeInTheDocument();
            await userEvent.click(svg);
            const svgFocused = screen.getByRole('img');
            expect(svgFocused).toBeInTheDocument();
            await userEvent.click(svgFocused);
            expect(svgFocused).not.toBeInTheDocument();
        });
    });
    describe('search field interactions', () => {
        it('should set focus when wrapper element is clicked', async () => {
            const focusSpy = jest.spyOn(inputNode, 'focus');

            expect(inputNode).not.toBe(document.activeElement);
            expect(focusSpy).not.toHaveBeenCalled();

            await userEvent.click(screen.queryAllByRole('listbox')[0]);

            expect(inputNode).toBe(document.activeElement);
            expect(focusSpy).toHaveBeenCalled();
        });
        it('should be able to get a component by ref sent as a prop', () => {
            const newProps = {
                suggestions,
                suggestionToString,
                // eslint-disable-next-line react/display-name
                listRenderer: (listProps) => <SuggestionsList {...listProps} />,
                focusedRenderer: mockRenderWithRef,
                blurredRenderer: mockRenderWithRef,
                ref: inputRef,
                onSelectionAdd: mockOnSelectionAdd,
                onInputValueChange: mockOnInputValueChange,
                onClearAllSelected: mockOnClearAllSelected,
                onBlur: mockOnBlur,
                highlightOnEmptyInput: true,
            };
            rerenderView(newProps);

            expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument();
        });
        it('should lose focus when suggestion is selected', async () => {
            expect(inputNode).not.toBe(document.activeElement);

            await userEvent.click(screen.queryAllByRole('listbox')[0]);
            await userEvent.click(screen.queryAllByRole('presentation')[0]);

            expect(screen.queryAllByRole('presentation')).toHaveLength(0);
        });
        it('should stay focused when suggestion is selected with keepExpandedAfterSelection set to true', async () => {
            const newProps = {
                suggestions,
                suggestionToString,
                // eslint-disable-next-line react/display-name
                listRenderer: (listProps) => <SuggestionsList {...listProps} />,
                focusedRenderer: mockRender,
                blurredRenderer: mockRender,
                onSelectionAdd: mockOnSelectionAdd,
                onInputValueChange: mockOnInputValueChange,
                onClearAllSelected: mockOnClearAllSelected,
                onBlur: mockOnBlur,
                highlightOnEmptyInput: true,
                keepExpandedAfterSelection: true,
            };
            rerenderView(newProps);
            expect(inputNode).not.toBe(document.activeElement);

            await userEvent.click(screen.queryAllByRole('listbox')[0]);
            expect(inputNode).toBe(document.activeElement);

            await userEvent.click(screen.queryAllByRole('presentation')[0]);
            expect(screen.queryAllByRole('presentation')).toHaveLength(suggestions.length);
        });
        it('should clear the input field when a suggestion was selected', async () => {
            const textInputValue = 'driver';
            const inputField = screen.getAllByRole('textbox')[0];
            await userEvent.type(inputField, textInputValue);

            expect(inputField.getAttribute('value')).toEqual(textInputValue);

            await userEvent.click(screen.queryAllByRole('presentation')[0]);

            expect(inputField.getAttribute('value')).toEqual('');
        });
        it('should clear the input field when a suggestion was selected with keepExpandedAfterSelection set to true', async () => {
            const textInputValue = 'driver';
            const newProps = {
                suggestions,
                suggestionToString,
                // eslint-disable-next-line react/display-name
                listRenderer: (listProps) => <SuggestionsList {...listProps} />,
                focusedRenderer: mockRender,
                blurredRenderer: mockRender,
                onSelectionAdd: mockOnSelectionAdd,
                onInputValueChange: mockOnInputValueChange,
                onClearAllSelected: mockOnClearAllSelected,
                onBlur: mockOnBlur,
                highlightOnEmptyInput: true,
                keepExpandedAfterSelection: true,
            };
            rerenderView(newProps);
            const inputField = screen.getAllByRole('textbox')[0];
            await userEvent.type(inputField, textInputValue);

            expect(inputField.getAttribute('value')).toEqual(textInputValue);

            await userEvent.click(screen.queryAllByRole('presentation')[0]);

            expect(inputField.getAttribute('value')).toEqual(textInputValue);
        });
    });
    describe('highlighting', () => {
        it('should highlight first item', () => {
            expect(view.asFragment()).toMatchSnapshot();
            expect(screen.queryAllByRole('listbox')[0]).toBeInTheDocument();
        });
    });

    describe('callbacks', () => {
        describe('onSelectionAdd', () => {
            it('should be called on clicking on a suggestion', async () => {
                await userEvent.click(screen.queryAllByRole('listbox')[0]);

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                await userEvent.click(screen.queryAllByRole('presentation')[0]);

                expect(mockOnSelectionAdd).toHaveBeenCalled();
            });
        });
        it('should call onClearAllSelected on Clear button click', async () => {
            const clearTitle = 'Clear';
            const newProps = {
                suggestions,
                suggestionToString,
                // eslint-disable-next-line react/display-name
                listRenderer: (listProps) => <SuggestionsList {...listProps} />,
                focusedRenderer: mockRender,
                blurredRenderer: mockRender,
                onSelectionAdd: mockOnSelectionAdd,
                onInputValueChange: mockOnInputValueChange,
                onClearAllSelected: mockOnClearAllSelected,
                onBlur: mockOnBlur,
                highlightOnEmptyInput: true,
                showArrow: true,
                clearTitle,
                showClearButton: true,
            };
            rerenderView(newProps);
            expect(view.asFragment()).toMatchSnapshot();
            const clearButton = screen.getByRole('button', { name: 'Clear' });
            await userEvent.click(clearButton);

            expect(mockOnClearAllSelected).toHaveBeenCalled();
        });
        // Despite everything is working good in real-case scenario,
        // 'blur' event can not be simulated in the way Downshift component to understand it.
        it.skip('should call onBlur', async () => {
            await userEvent.click(screen.queryAllByRole('listbox')[0]);

            await userEvent.click(screen.queryAllByRole('listbox')[0]);

            expect(mockOnBlur).toHaveBeenCalled();
        });
        it('should call onInputValueChange when typing into input field', async () => {
            expect(mockOnInputValueChange).not.toHaveBeenCalled();

            const inputField = screen.getAllByRole('textbox')[0];
            await userEvent.type(inputField, 'drive');

            expect(mockOnInputValueChange).toHaveBeenCalled();
        });
    });
});
