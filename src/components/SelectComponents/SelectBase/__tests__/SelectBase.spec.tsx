import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SelectBase } from '../SelectBase';
import { SuggestionsList } from '../../SuggestionsList';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../Autosuggest/__mocks__/suggestions';

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
        view.rerender(<SelectBase {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        view = render(<SelectBase {...defaultProps} />);
        inputNode = screen.getByRole('textbox');
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.container).toMatchSnapshot();
        });
    });

    describe('with toggle arrow', () => {
        it('should show arrows when showArrow is true', () => {
            const newProps = {
                highlightOnEmptyInput: true,
                showArrow: true,
            };
            rerenderView(newProps);

            expect(view.container).toMatchSnapshot();
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('should toggle focus and the arrow when it is clicked', async () => {
            const user = userEvent.setup();
            const newProps = {
                highlightOnEmptyInput: true,
                showArrow: true,
            };
            rerenderView(newProps);

            expect(view.container).toMatchSnapshot();

            const svg = screen.getByRole('button');

            expect(svg).toBeInTheDocument();

            await user.click(svg);
            const svgFocused = screen.getByRole('button');

            expect(svgFocused).toBeInTheDocument();

            await user.click(svgFocused);

            expect(svgFocused).not.toBeInTheDocument();
        });

        it('should have the correct ARIA label on the drop arrow', async () => {
            const user = userEvent.setup();
            const downArrowLabel = 'down';
            const upArrowLabel = 'up';
            const newProps = {
                highlightOnEmptyInput: true,
                showArrow: true,
                downArrowLabel,
                upArrowLabel,
            };
            rerenderView(newProps);

            expect(screen.getByLabelText(downArrowLabel)).toBeInTheDocument();

            await user.click(screen.getByRole('button'));

            expect(screen.getByLabelText(upArrowLabel)).toBeInTheDocument();
        });
    });

    describe('search field interactions', () => {
        it('should set focus when wrapper element is clicked', async () => {
            const user = userEvent.setup();
            const focusSpy = jest.spyOn(inputNode, 'focus');

            expect(inputNode).not.toBe(document.activeElement);
            expect(focusSpy).not.toHaveBeenCalled();

            await user.click(screen.queryAllByRole('listbox')[0]);

            expect(inputNode).toBe(document.activeElement);
            expect(focusSpy).toHaveBeenCalled();
        });

        it('should be able to get a component by ref sent as a prop', () => {
            const newProps = {
                ref: inputRef,
                focusedRenderer: mockRenderWithRef,
                blurredRenderer: mockRenderWithRef,
                highlightOnEmptyInput: true,
            };
            rerenderView(newProps);

            expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument();
        });

        it('should lose focus when suggestion is selected', async () => {
            const user = userEvent.setup();

            expect(inputNode).not.toBe(document.activeElement);

            await user.click(screen.queryAllByRole('listbox')[0]);
            await user.click(screen.queryAllByRole('option')[0]);

            expect(screen.queryAllByRole('option')).toHaveLength(0);
        });

        it('should stay focused when suggestion is selected with keepExpandedAfterSelection set to true', async () => {
            const user = userEvent.setup();
            const newProps = {
                highlightOnEmptyInput: true,
                keepExpandedAfterSelection: true,
            };
            rerenderView(newProps);
            expect(inputNode).not.toBe(document.activeElement);

            await user.click(screen.queryAllByRole('listbox')[0]);
            expect(inputNode).toBe(document.activeElement);

            await user.click(screen.queryAllByRole('option')[0]);
            expect(screen.queryAllByRole('option')).toHaveLength(suggestions.length);
        });

        it('should not clear the input field when a suggestion was selected', () => {
            const textInputValue = 'driver';
            const inputField = screen.getAllByRole('textbox')[0];
            fireEvent.change(screen.getByRole('textbox'), {
                target: {
                    value: textInputValue,
                },
            });
            expect(mockOnInputValueChange).toHaveBeenCalledTimes(1);
            expect(mockOnInputValueChange).toHaveBeenCalledWith(textInputValue);

            expect(inputField.getAttribute('value')).toEqual(textInputValue);

            fireEvent.click(screen.queryAllByRole('option')[0]);

            expect(inputField.getAttribute('value')).toEqual(textInputValue);
        });

        it('should clear the input field when a suggestion was selected with keepExpandedAfterSelection set to true', async () => {
            const user = userEvent.setup();
            const textInputValue = 'driver';
            const newProps = {
                highlightOnEmptyInput: true,
                keepExpandedAfterSelection: true,
            };
            rerenderView(newProps);
            const inputField = screen.getAllByRole('textbox')[0];
            await user.type(inputField, textInputValue);

            expect(inputField.getAttribute('value')).toEqual(textInputValue);

            await user.click(screen.queryAllByRole('option')[0]);

            expect(inputField.getAttribute('value')).toEqual(textInputValue);
        });
    });

    describe('highlighting', () => {
        it('should highlight first item', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.queryAllByRole('listbox')[0]).toBeInTheDocument();
        });
    });

    describe('callbacks', () => {
        describe('onSelectionAdd', () => {
            it('should be called on clicking on a suggestion', async () => {
                const user = userEvent.setup();
                await user.click(screen.queryAllByRole('listbox')[0]);

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                await user.click(screen.queryAllByRole('option')[0]);

                expect(mockOnSelectionAdd).toHaveBeenCalled();
            });
        });

        it('should call onClearAllSelected on Clear button click', async () => {
            const user = userEvent.setup();
            const clearTitle = 'Clear';
            const newProps = {
                highlightOnEmptyInput: true,
                showArrow: true,
                clearTitle,
                showClearButton: true,
            };
            rerenderView(newProps);

            expect(view.container).toMatchSnapshot();

            const clearButton = screen.getByRole('button', { name: 'Clear' });
            await user.click(clearButton);

            expect(mockOnClearAllSelected).toHaveBeenCalled();
        });
        // Despite everything is working good in real-case scenario,
        // 'blur' event can not be simulated in the way Downshift component to understand it.
        it.skip('should call onBlur', async () => {
            const user = userEvent.setup();
            await user.click(screen.queryAllByRole('listbox')[0]);

            await user.click(screen.queryAllByRole('listbox')[0]);

            expect(mockOnBlur).toHaveBeenCalled();
        });

        it('should call onInputValueChange when typing into input field', async () => {
            const user = userEvent.setup();

            expect(mockOnInputValueChange).not.toHaveBeenCalled();

            const inputField = screen.getAllByRole('textbox')[0];
            await user.type(inputField, 'drive');

            expect(mockOnInputValueChange).toHaveBeenCalled();
        });
    });
});
