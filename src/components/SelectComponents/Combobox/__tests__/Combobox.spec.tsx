import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Combobox } from '../Combobox';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../../AutosuggestDeprecated/__mocks__/suggestions';

describe('Combobox', () => {
    window.focus = jest.fn();
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
    let viewContainer;
    const getInputNode = (container) => container.querySelector('input');

    const setFocus = async () => userEvent.click(screen.getByRole('searchbox'));

    const defaultProps = {
        suggestions,
        suggestionToString,
        inputPlaceholder,
        noSuggestionsPlaceholder,
        upArrowLabel,
        downArrowLabel,
        onSelectionAdd: mockOnSelectionAdd,
        onInputValueChange: mockOnInputValueChange,
        onBlur: mockOnBlur,
    };
    const rerenderView = (props) => {
        view.rerender(<Combobox {...defaultProps} {...props} />);
    };

    beforeEach(() => {
        view = render(<Combobox {...defaultProps} />);
        viewContainer = view.container;
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.container).toMatchSnapshot();
            expect(screen.getByLabelText(downArrowLabel)).toBeInTheDocument();
        });
        it('should set focus on the input field', async () => {
            await setFocus();

            expect(getInputNode(viewContainer)).toBe(document.activeElement);
        });
        it('should not set focus on the input field when the component is disabled', async () => {
            const newProps = {
                disabled: true,
            };
            rerenderView(newProps);
            await setFocus();

            expect(screen.queryAllByRole('textbox')).toHaveLength(0);
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', async () => {
            const newProps = {
                suggestions: [],
            };
            rerenderView(newProps);
            await setFocus();

            expect(view.container).toMatchSnapshot();
            expect(screen.queryByRole('option')).not.toBeInTheDocument();
            expect(screen.getByRole('listitem')).toBeInTheDocument();
            expect(screen.getByText(noSuggestionsPlaceholder)).toBeInTheDocument();
        });
        it('should render all suggestions from the list', async () => {
            await setFocus();

            expect(screen.getAllByRole('option')).toHaveLength(suggestions.length);
        });
        describe('when blurred', () => {
            it('should render selection placeholder', () => {
                expect(screen.getByText('type here...')).toBeInTheDocument();
            });
            it('should show the selected value if available', async () => {
                const newProps = {
                    suggestions: [],
                    disabled: true,
                    selectedSuggestion: SUGGESTIONS[1],
                };
                rerenderView(newProps);
                await setFocus();

                expect(view.container).toMatchSnapshot();
                expect(screen.getByText(SUGGESTIONS[1].name)).toBeInTheDocument();
            });
        });
        describe('when focused', () => {
            it('should add additional attributes to input field when component is focused', async () => {
                const newProps = {
                    inputAttrs: { 'data-test': true, title: 'some title' },
                };
                rerenderView(newProps);
                await setFocus();
                const inputField = screen.getAllByRole('textbox')[0];

                expect(inputField).toHaveAttribute('data-test', 'true');
                expect(inputField).toHaveAttribute('title', 'some title');
            });
            it('should render selection placeholder', async () => {
                await setFocus();
                const inputField = screen.getAllByRole('textbox')[0];

                expect(inputField.getAttribute('placeholder')).toEqual(inputPlaceholder);
            });
            it('should show the selected value as placeholder if available', async () => {
                await setFocus();
                const inputField = screen.getAllByRole('textbox')[0];

                expect(inputField.getAttribute('placeholder')).toEqual(inputPlaceholder);
                const newProps = {
                    selectedSuggestion: SUGGESTIONS[1],
                };
                rerenderView(newProps);
                await setFocus();

                expect(inputField.getAttribute('placeholder')).toEqual(SUGGESTIONS[1].name);
            });
        });
    });
    describe('focusing and blurring the search field', () => {
        it('should set focus when wrapper element is clicked', async () => {
            expect(getInputNode(viewContainer)).not.toBe(document.activeElement);

            await setFocus();

            expect(screen.getByRole('textbox')).toBe(document.activeElement);
        });
        it('should not stay focused when suggestion is selected', async () => {
            expect(getInputNode(viewContainer)).not.toBe(document.activeElement);

            await setFocus();
            expect(getInputNode(viewContainer)).toBe(document.activeElement);

            await userEvent.click(screen.queryAllByRole('option')[0]);

            expect(getInputNode(viewContainer)).not.toBe(document.activeElement);
            expect(screen.queryAllByRole('option')).toHaveLength(0);
        });
        it('should blur on pressing Escape button', async () => {
            await setFocus();
            expect(getInputNode(viewContainer)).toBe(document.activeElement);

            await userEvent.keyboard('[Escape]');

            expect(getInputNode(viewContainer)).not.toBe(document.activeElement);
            expect(mockOnBlur).toHaveBeenCalled();
        });
        // TODO: fixMe - the component doesn't get blurred, even though it does work in the UI
        // it.skip('should blur on pressing Tab button', async (done) => {
        //     await setFocus();
        //     await userEvent.keyboard('[Tab]');
        //     setTimeout(() => {
        //         expect(getInputNode()).not.toBe(document.activeElement);
        //         // TODO: fixMe - the callback is not triggered, even though it does work in the UI
        //         // expect(mockOnBlur).toHaveBeenCalled();
        //         done();
        //     });
        // });
        it('should blur on pressing ENTER button', async () => {
            await setFocus();
            await userEvent.keyboard('[Enter]');

            expect(getInputNode(viewContainer)).not.toBe(document.activeElement);
            expect(mockOnBlur).toHaveBeenCalled();
        });
    });
    describe('callbacks', () => {
        describe('onSelectionAdd', () => {
            it('should be called on clicking on a suggestion', async () => {
                expect(view.container).toMatchSnapshot();
                await setFocus();
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                await userEvent.click(screen.queryAllByRole('option')[0]);

                expect(mockOnSelectionAdd).toHaveBeenCalledWith(SUGGESTIONS[0]);
            });
            it('should be called when pressing Enter', async () => {
                await setFocus();
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                await userEvent.keyboard('[Enter]');
                expect(mockOnSelectionAdd).toHaveBeenCalledWith(SUGGESTIONS[0]);
            });
            it('should not be called when pressing Tab', async () => {
                await setFocus();
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                await userEvent.keyboard('[Tab]');
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();
            });
            it('should not be called when pressing ESC', async () => {
                await setFocus();
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                await userEvent.keyboard('[ESC]');
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();
            });
        });
        describe('onInputValueChange', () => {
            it('should call onInputValueChange when typing into the input field', async () => {
                await setFocus();
                expect(mockOnInputValueChange).not.toHaveBeenCalled();

                await userEvent.type(screen.getAllByRole('textbox')[0], 'dri');
                expect(mockOnInputValueChange).toHaveBeenCalledWith('dri');
            });
        });
    });
});
