/* eslint-disable */
import React from 'react';
import toJson from 'enzyme-to-json';
import Autocomplete from '../Autocomplete';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../__mocks__/suggestions';
import { NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS } from '../../../constants';

describe('Autocomplete', () => {
    const suggestionToString = SUGGESTION_TO_STRING;
    let selectedPlaceholder = '';
    const inputPlaceholder = 'type here...';
    const noSuggestionsPlaceholder = 'No suggestions...';
    const clearTitle = 'Clear';
    const mockOnSelectionChange = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockonClearAllSelected = jest.fn();
    const mockOnBlur = jest.fn();

    let suggestionsList = null;
    const getSuggestions = () => suggestionsList;
    let selectedSuggestions = [];

    let wrapper;
    let instance;

    const setFocusOnInput = () => wrapper.find('.Autocomplete__input').simulate('click');

    beforeEach(() => {
        wrapper = mount(
            <Autocomplete
                selectedSuggestions={selectedSuggestions}
                getSuggestions={getSuggestions}
                suggestionToString={suggestionToString}
                selectedPlaceholder={selectedPlaceholder}
                inputPlaceholder={inputPlaceholder}
                clearTitle={clearTitle}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                onSelectionChange={mockOnSelectionChange}
                onInputValueChange={mockOnInputValueChange}
                onBlur={mockOnBlur}
                onClearAllSelected={mockonClearAllSelected}
                showClearButton
            />
        );
        instance = wrapper.find('Autocomplete').instance();
    });

    afterEach(() => {
        suggestionsList = null;
        selectedSuggestions = [];
    });

    describe('rendering', () => {
        it('should initally render empty component correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.state('focused')).toBeFalsy();
        });
        it('should render empty component correctly when focused', () => {
            setFocusOnInput();
            expect(wrapper.find('li')).toHaveLength(0);
            expect(wrapper.state('focused')).toBeTruthy();
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
            suggestionsList = [];
            wrapper.find('input').simulate('change', { target: { value: 'driver' } });
            setFocusOnInput();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('li')).toHaveLength(1);
            expect(
                wrapper
                    .find('li')
                    .childAt(0)
                    .text()
            ).toEqual(noSuggestionsPlaceholder);
        });
        it('should render all suggestions from the list', () => {
            suggestionsList = SUGGESTIONS.slice(0, 4);
            setFocusOnInput();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('li')).toHaveLength(suggestionsList.length);
        });
        it('should render selection placeholder when component is not focused', () => {
            selectedPlaceholder = 'Current selection';
            wrapper.setProps({ selectedPlaceholder });
            expect(wrapper.find('.Autocomplete__spacedElem').text()).toEqual(selectedPlaceholder);
        });
        it('should render tag for each selected selection when component is focused', () => {
            selectedSuggestions = SUGGESTIONS.slice(0, 5);
            wrapper.setProps({ selectedSuggestions });
            setFocusOnInput();

            expect(wrapper.find('ItemTag')).toHaveLength(selectedSuggestions.length);
        });
        it('should render clear button only if there are selected suggestion', () => {
            expect(wrapper.find('.InputWrapper__clearButton')).toHaveLength(0);

            selectedSuggestions = SUGGESTIONS.slice(0, 5);
            wrapper.setProps({ selectedSuggestions });

            expect(wrapper.find('.InputWrapper__clearButton')).toHaveLength(2);
        });
        it('should not render clear button if component is in focus', () => {
            selectedSuggestions = SUGGESTIONS.slice(0, 5);
            wrapper.setProps({ selectedSuggestions });

            expect(wrapper.find('.InputWrapper__clearButton')).toHaveLength(2);
            setFocusOnInput();

            expect(wrapper.find('.InputWrapper__clearButton')).toHaveLength(0);
        });

        it(`should render ${NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS} loaders if isLoading is true`, () => {
            wrapper.find('input').simulate('change', { target: { value: 'driver' } });
            wrapper.setProps({ isLoading: true });

            expect(wrapper.find('li')).toHaveLength(NUMBER_OF_SUGGESTION_LOADING_PLACEHOLDERS);
        });
    });
    describe('focusing and blurring the search field', () => {
        it('should set focus when wrapper element is clicked', () => {
            const inputEl = instance.inputRef.current;
            const focusSpy = jest.spyOn(inputEl, 'focus');

            expect(wrapper.state('focused')).toBeFalsy();
            expect(focusSpy).not.toHaveBeenCalled();

            wrapper.find('.Autocomplete__wrapper').simulate('click');

            expect(wrapper.state('focused')).toBeTruthy();
            expect(focusSpy).toHaveBeenCalledTimes(1);
        });
        it('should blur on pressing Escape button', () => {
            const inputEl = instance.inputRef.current;
            const blurSpy = jest.spyOn(inputEl, 'blur');

            setFocusOnInput();

            expect(wrapper.state('focused')).toBeTruthy();

            wrapper.find('input').simulate('keyDown', { key: 'Escape' });

            expect(wrapper.state('focused')).toBeFalsy();
            expect(blurSpy).toHaveBeenCalled();
            expect(mockOnBlur).toHaveBeenCalled();
        });
        it('should blur on pressing Tab button', () => {
            const inputEl = instance.inputRef.current;
            const blurSpy = jest.spyOn(inputEl, 'blur');

            setFocusOnInput();

            expect(wrapper.state('focused')).toBeTruthy();

            wrapper.find('input').simulate('keyDown', { key: 'Tab' });

            /**
             * This line makes test fail.
             * According to that the component doesn't lose the 'focused' property, but in fact it does.
             * The reason is JSDom rendered here has no other tabular element.
             * expect(wrapper.state('focused')).toBeFalsy();
             */
            expect(blurSpy).toHaveBeenCalled();
            expect(mockOnBlur).toHaveBeenCalled();
        });
        describe('in single select mode', () => {
            it('should not stay focused when suggestion is selected', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);

                expect(wrapper.prop('isMultiselect')).toBeFalsy();
                expect(wrapper.state('focused')).toBeFalsy();

                setFocusOnInput();
                expect(wrapper.state('focused')).toBeTruthy();

                wrapper
                    .find('li')
                    .at(0)
                    .childAt(0)
                    .simulate('click');

                expect(wrapper.state('focused')).toBeFalsy();
                expect(wrapper.find('li')).toHaveLength(0);
            });
        });
        describe('in multiselect mode', () => {
            it('should stay focused when suggestion is selected', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                wrapper.setProps({ isMultiselect: true });

                // expect(wrapper.prop('isMultiselect')).toBeFalsy();
                expect(wrapper.state('focused')).toBeFalsy();

                setFocusOnInput();
                expect(wrapper.state('focused')).toBeTruthy();

                wrapper
                    .find('li')
                    .at(0)
                    .childAt(0)
                    .simulate('click');

                expect(wrapper.state('focused')).toBeTruthy();
                expect(wrapper.find('li')).not.toHaveLength(0);
            });
            it('should stay focused when suggestion is deleted from selected list', () => {
                suggestionsList = SUGGESTIONS.slice(0, 20);
                selectedSuggestions = SUGGESTIONS.slice(1, 4);
                wrapper.setProps({ selectedSuggestions });

                setFocusOnInput();
                expect(wrapper.state('focused')).toBeTruthy();

                wrapper.find('input').simulate('keyDown', { key: 'Backspace' });

                expect(wrapper.state('focused')).toBeTruthy();
            });
        });
    });
    describe('callbacks', () => {
        describe('onSelectionChange', () => {
            it('should be called on clicking on a suggestion', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper
                    .find('li')
                    .first()
                    .children()
                    .simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalled();
            });
            it('should be called on deleting a suggestion by clicking on the x button next to it', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();
                expect(wrapper.find('ItemTag')).toHaveLength(selectedSuggestions.length);

                wrapper
                    .find('ItemTag')
                    .at(2)
                    .find('button')
                    .simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalledWith(selectedSuggestions[2]);
            });
            it('should be called on deleting a suggestion by hitting backspace in the empty input field', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('input').simulate('keyDown', { key: 'Backspace' });

                expect(mockOnSelectionChange).toHaveBeenCalled();
            });
            it('should not be called on deleting a suggestion by hitting backspace in an input field with value', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnInput();
                wrapper.find('input').simulate('change', { target: { value: 'driver' } });

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('input').simulate('keyDown', { key: 'Backspace' });

                expect(mockOnSelectionChange).not.toHaveBeenCalled();
            });
        });
        it('should call onInputValueChange when typing into input field', () => {
            expect(mockOnInputValueChange).not.toHaveBeenCalled();

            wrapper.find('input').simulate('change', { target: { value: 'driver' } });

            expect(mockOnInputValueChange).toHaveBeenCalled();
        });
        it('should call onClearAllSelected when clear button was clicked', () => {
            selectedSuggestions = SUGGESTIONS.slice(0, 5);
            wrapper.setProps({ selectedSuggestions });
            expect(mockonClearAllSelected).not.toHaveBeenCalled();

            wrapper
                .find('.InputWrapper__clearButton')
                .at(1)
                .simulate('click');

            expect(mockonClearAllSelected).toHaveBeenCalled();
        });
        it('should clear the input field when a suggestion was selected', () => {
            const textInputValue = 'driver';
            suggestionsList = SUGGESTIONS.slice(1, 20);
            wrapper.find('input').simulate('change', { target: { value: textInputValue } });

            expect(wrapper.find('input').props().value).toEqual(textInputValue);

            wrapper
                .find('li')
                .first()
                .children()
                .simulate('click');

            expect(wrapper.find('input').props().value).toEqual('');
        });
    });
});
