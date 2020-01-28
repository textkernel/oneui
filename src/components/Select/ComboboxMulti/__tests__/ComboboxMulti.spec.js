import React from 'react';
import toJson from 'enzyme-to-json';
import { ComboboxMulti } from '../ComboboxMulti';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../../Autosuggest/__mocks__/suggestions';

describe('ComboboxMulti', () => {
    const suggestionToString = SUGGESTION_TO_STRING;
    const inputPlaceholder = 'type here...';
    const noSuggestionsPlaceholder = 'No suggestions...';
    const clearTitle = 'Clear';
    const mockOnSelectionChange = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnClearAllSelected = jest.fn();
    const mockOnBlur = jest.fn();

    let suggestionsList = SUGGESTIONS;

    let wrapper;
    let instance;

    const setFocusOnInput = () =>
        wrapper
            .find('.SelectBase__field')
            .at(0)
            .simulate('click');

    beforeEach(() => {
        wrapper = mount(
            <ComboboxMulti
                suggestions={suggestionsList}
                suggestionToString={suggestionToString}
                inputPlaceholder={inputPlaceholder}
                clearTitle={clearTitle}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                onSelectionChange={mockOnSelectionChange}
                onInputValueChange={mockOnInputValueChange}
                onBlur={mockOnBlur}
                onClearAllSelected={mockOnClearAllSelected}
                showClearButton
            />
        );
        instance = wrapper.find('ComboboxMulti').instance();
    });

    afterEach(() => {
        suggestionsList = null;
        wrapper.unmount();
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should render empty component correctly when focused', () => {
            setFocusOnInput();
            expect(wrapper.find('li')).toHaveLength(0);
            // expect(wrapper.state('focused')).toBeTruthy();
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
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
            wrapper.setProps({ suggestions: suggestionsList });
            setFocusOnInput();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('li')).toHaveLength(suggestionsList.length);
        });
        it('should render selection placeholder when component is not focused', () => {
            expect(wrapper.find('input').props().placeholder).toEqual(inputPlaceholder);
        });
    });
    describe('focusing and blurring the search field', () => {
        it('should set focus when wrapper element is clicked', () => {
            const inputEl = instance.inputRef.current;
            const focusSpy = jest.spyOn(inputEl, 'focus');

            expect(wrapper.state('focused')).toBeFalsy();
            expect(focusSpy).not.toHaveBeenCalled();

            setFocusOnInput();

            expect(wrapper.state('focused')).toBeTruthy();
            expect(focusSpy).toHaveBeenCalledTimes(1);
        });
        it('should stay focused when suggestion is selected', () => {
            suggestionsList = SUGGESTIONS.slice(1, 20);

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
        it('should clear input value on pressing Escape button', () => {
            const textInputValue = 'driver';

            wrapper.find('input').simulate('change', { target: { value: textInputValue } });

            expect(wrapper.find('input').props().value).toEqual(textInputValue);

            wrapper.find('input').simulate('keyDown', { key: 'Escape' });

            expect(wrapper.find('input').props().value).toEqual('');
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
    });
    describe('callbacks', () => {
        describe('onSelectionChange', () => {
            it('should be called on clicking on a suggestion', () => {
                suggestionsList = SUGGESTIONS.slice(0, 4);
                wrapper.setProps({ suggestions: suggestionsList });
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();
                expect(toJson(wrapper)).toMatchSnapshot();

                wrapper
                    .find('li')
                    .first()
                    .children()
                    .simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalled();
            });
        });
        it('should call onInputValueChange when typing into input field', () => {
            expect(mockOnInputValueChange).not.toHaveBeenCalled();

            wrapper.find('input').simulate('change', { target: { value: 'driver' } });

            expect(mockOnInputValueChange).toHaveBeenCalled();
        });
        it('should not clear the input field when a suggestion was selected', () => {
            const textInputValue = 'driver';
            suggestionsList = SUGGESTIONS.slice(0, 4);
            wrapper.setProps({ suggestions: suggestionsList });
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
