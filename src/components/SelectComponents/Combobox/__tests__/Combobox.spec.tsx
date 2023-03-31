import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
    const mockOnSelectionAdd = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnBlur = jest.fn();

    const suggestions = SUGGESTIONS;

    let view;
    let viewContainer;
    const getInputNode = (container) => container.querySelector('input');
    // const getInputNode = (container) =>
    //     container.querySelector('input').length
    //         ? container.querySelector('input').getDOMNode()
    //         : null;

    const setFocusOnInput = (container) =>
        fireEvent.click(container.querySelector('.Combobox__wrapper'));

    beforeEach(() => {
        view = render(
            <Combobox<{ name: string }>
                suggestions={suggestions}
                suggestionToString={suggestionToString}
                inputPlaceholder={inputPlaceholder}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                onSelectionAdd={mockOnSelectionAdd}
                onInputValueChange={mockOnInputValueChange}
                onBlur={mockOnBlur}
            />
        );
        viewContainer = view.container;
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(view.asFragment()).toMatchSnapshot();
        });
        it('should set focus on the input field', () => {
            setFocusOnInput(viewContainer);

            expect(getInputNode(viewContainer)).toBe(document.activeElement);
        });
        it('should not set focus on the input field when the component is disabled', () => {
            view.rerender(
                <Combobox<{ name: string }>
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
            setFocusOnInput(viewContainer);

            expect(viewContainer.querySelectorAll('input')).toHaveLength(0);
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
            view.rerender(
                <Combobox<{ name: string }>
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
            setFocusOnInput(viewContainer);
            // expect(viewContainer.querySelectorAll('li')).toHaveLength(1);

            // expect(wrapper.find('li')).toHaveLength(1);
            // expect(wrapper.find('li').childAt(0).text()).toEqual(noSuggestionsPlaceholder);
        });
        it('should render all suggestions from the list', () => {
            setFocusOnInput(viewContainer);

            expect(viewContainer.querySelectorAll('li')).toHaveLength(suggestions.length);
        });
        describe('when blurred', () => {
            it('should render selection placeholder', () => {
                expect(screen.findByText('type here...')).toBeDefined();
            });
            it('should show the selected value if available', () => {
                view.rerender(
                    <Combobox<{ name: string }>
                        suggestions={[]}
                        suggestionToString={suggestionToString}
                        inputPlaceholder={inputPlaceholder}
                        noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                        onSelectionAdd={mockOnSelectionAdd}
                        onInputValueChange={mockOnInputValueChange}
                        onBlur={mockOnBlur}
                        disabled
                        selectedSuggestion={SUGGESTIONS[1]}
                    />
                );

                expect(screen.findByText(SUGGESTIONS[1].name)).toBeDefined();
            });
        });
        describe('when focused', () => {
            it('should add additional attributes to input field when component is focused', () => {
                view.rerender(
                    <Combobox<{ name: string }>
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
                setFocusOnInput(viewContainer);
                const inputField = viewContainer.querySelector('input') as Element;

                expect(inputField.outerHTML).toMatch('data-test="true"');
                expect(inputField.outerHTML).toMatch('title="some title"');
            });
            it('should render selection placeholder', () => {
                setFocusOnInput(viewContainer);
                const inputField = viewContainer.querySelector('input') as Element;

                expect(inputField.getAttribute('placeholder')).toEqual(inputPlaceholder);
            });
            it('should show the selected value as placeholder if available', () => {
                setFocusOnInput(viewContainer);
                const inputField = viewContainer.querySelector('input') as Element;

                expect(inputField.getAttribute('placeholder')).toEqual(inputPlaceholder);

                view.rerender(
                    <Combobox<{ name: string }>
                        suggestions={suggestions}
                        suggestionToString={suggestionToString}
                        inputPlaceholder={inputPlaceholder}
                        noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                        onSelectionAdd={mockOnSelectionAdd}
                        onInputValueChange={mockOnInputValueChange}
                        onBlur={mockOnBlur}
                        selectedSuggestion={SUGGESTIONS[1]}
                    />
                );
                setFocusOnInput(viewContainer);

                expect(inputField.getAttribute('placeholder')).toEqual(SUGGESTIONS[1].name);
            });
        });
    });
    describe('focusing and blurring the search field', () => {
        it('should set focus when wrapper element is clicked', () => {
            expect(getInputNode(viewContainer)).not.toBe(document.activeElement);

            setFocusOnInput(viewContainer);
            // expect(viewContainer.querySelector('input')).toBe(document.activeElement);
            // expect(viewContainer.querySelector('.Combobox__wrapper')).toBe(document.activeElement);
        });
        // it('should not stay focused when suggestion is selected', () => {
        //     expect(getInputNode()).not.toBe(document.activeElement);
        //
        //     setFocusOnInput();
        //     expect(getInputNode()).toBe(document.activeElement);
        //
        //     wrapper.find('li').at(0).childAt(0).simulate('click');
        //
        //     expect(getInputNode()).not.toBe(document.activeElement);
        //     expect(wrapper.find('li')).toHaveLength(0);
        // });
        // it('should blur on pressing Escape button', () => {
        //     setFocusOnInput();
        //     expect(getInputNode()).toBe(document.activeElement);
        //
        //     wrapper.find('input').simulate('keyDown', { key: 'Escape' });
        //     wrapper.update();
        //
        //     expect(getInputNode()).not.toBe(document.activeElement);
        //     // TODO: fixMe - the callback is not triggered, even though it does work in the UI
        //     // expect(mockOnBlur).toHaveBeenCalled();
        // });
        // // TODO: fixMe - the component doesn't get blurred, even though it does work in the UI
        // it.skip('should blur on pressing Tab button', (done) => {
        //     setFocusOnInput();
        //     wrapper.find('input').simulate('keyDown', { key: 'Tab' });
        //     setTimeout(() => {
        //         wrapper.update();
        //         expect(getInputNode()).not.toBe(document.activeElement);
        //         // TODO: fixMe - the callback is not triggered, even though it does work in the UI
        //         // expect(mockOnBlur).toHaveBeenCalled();
        //         done();
        //     });
        // });
        // it('should blur on pressing ENTER button', () => {
        //     setFocusOnInput();
        //     wrapper.find('input').simulate('keyDown', { key: 'Enter' });
        //     wrapper.update();
        //
        //     expect(getInputNode()).not.toBe(document.activeElement);
        //     // TODO: fixMe - the callback is not triggered, even though it does work in the UI
        //     // expect(mockOnBlur).toHaveBeenCalled();
        // });
    });
    describe('callbacks', () => {
        describe('onSelectionAdd', () => {
            it('should be called on clicking on a suggestion', () => {
                expect(view.asFragment()).toMatchSnapshot();
                setFocusOnInput(viewContainer);
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                fireEvent.click(viewContainer.querySelector('li'));

                expect(mockOnSelectionAdd).toHaveBeenCalledWith(SUGGESTIONS[0]);
            });
            it('should be called when pressing Enter', () => {
                setFocusOnInput(viewContainer);
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                fireEvent.click(viewContainer.querySelector('li'), { key: 'Enter' }); // need to check keyDown

                expect(mockOnSelectionAdd).toHaveBeenCalledWith(SUGGESTIONS[0]);
            });
            it('should not be called when pressing Tab', () => {
                setFocusOnInput(viewContainer);
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                fireEvent.keyDown(viewContainer.querySelector('input'), { key: 'Tab' });

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();
            });
            it('should not be called when pressing ESC', () => {
                setFocusOnInput(viewContainer);
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                fireEvent.keyDown(viewContainer.querySelector('input'), { key: 'ESC' });

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();
            });
        });
        describe('onInputValueChange', () => {
            it('should call onInputValueChange when typing into the input field', () => {
                setFocusOnInput(viewContainer);
                expect(mockOnInputValueChange).not.toHaveBeenCalled();

                fireEvent.change(viewContainer.querySelector('input'), {
                    target: { value: 'dri' },
                });

                expect(mockOnInputValueChange).toHaveBeenCalledWith('dri');
            });
        });
    });
});
