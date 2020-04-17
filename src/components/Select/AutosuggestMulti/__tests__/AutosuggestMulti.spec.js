import React from 'react';
import toJson from 'enzyme-to-json';
import { AutosuggestMulti } from '../AutosuggestMulti';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../../Autosuggest/__mocks__/suggestions';

describe('AutosuggestMulti', () => {
    const suggestionToString = SUGGESTION_TO_STRING;
    const inputPlaceholder = 'type here...';
    const numberOfVisibleTags = 3;
    const mockOnSelectionChange = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnBlur = jest.fn();
    const mockOnSubmit = jest.fn();

    let suggestionsList = [];
    let selectedSuggestions = [];

    let wrapper;
    const setFocusOnAutosuggest = () =>
        wrapper.find('[role="searchbox"]').simulate('keyDown', { key: 'Enter' });

    beforeEach(() => {
        wrapper = mount(
            <AutosuggestMulti
                selectedSuggestions={selectedSuggestions}
                suggestions={suggestionsList}
                suggestionToString={suggestionToString}
                inputPlaceholder={inputPlaceholder}
                onSelectionChange={mockOnSelectionChange}
                onInputValueChange={mockOnInputValueChange}
                numberOfVisibleTags={numberOfVisibleTags}
                onBlur={mockOnBlur}
                onSubmit={mockOnSubmit}
            />
        );
    });

    afterEach(() => {
        suggestionsList = [];
        selectedSuggestions = [];
        wrapper.unmount();
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should render empty component correctly when focused', async () => {
            setFocusOnAutosuggest();
            const inputNode = wrapper.find('input').getDOMNode();
            expect(document.activeElement).toBe(inputNode);
        });
        it('should render tag for each selected selection when component is focused', () => {
            selectedSuggestions = SUGGESTIONS.slice(0, 5);
            wrapper.setProps({ selectedSuggestions });
            setFocusOnAutosuggest();

            expect(wrapper.find('SuggestionTag')).toHaveLength(selectedSuggestions.length);
        });
        it('should render tag for each selected selection when component is blurred', () => {
            selectedSuggestions = SUGGESTIONS.slice(0, 5);
            wrapper.setProps({ selectedSuggestions });

            expect(wrapper.find('SuggestionTag')).toHaveLength(numberOfVisibleTags + 1);
        });
    });
    describe('focusing and blurring the search field', () => {
        it('should clear input value on pressing Escape button', () => {
            const textInputValue = 'driver';
            setFocusOnAutosuggest();
            wrapper.find('input').simulate('change', { target: { value: textInputValue } });
            expect(wrapper.find('input').props().value).toEqual(textInputValue);
            wrapper.find('input').simulate('keyDown', { key: 'Escape' });
            expect(wrapper.find('input').props().value).toEqual('');
        });
        it('should blur on pressing Tab button', () => {
            setFocusOnAutosuggest();
            wrapper.find('input').simulate('keyDown', { key: 'Tab' });
            expect(mockOnBlur).toHaveBeenCalled();
        });
    });
    describe('callbacks', () => {
        describe('onSelectionChange', () => {
            it('should be called on clicking on a suggestion', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                wrapper.setProps({ suggestions: suggestionsList });
                setFocusOnAutosuggest();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('input').simulate('change', { target: { value: 'a' } });
                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalled();
            });
            it('should be called by pressing Tab button', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                wrapper.setProps({ suggestions: suggestionsList });
                setFocusOnAutosuggest();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('input').simulate('change', { target: { value: 'driver' } });
                wrapper.find('input').simulate('keyDown', { key: 'Tab' });

                expect(mockOnSelectionChange).toHaveBeenCalled();
            });
            it('should be called by clicking on a suggestion the second time in a row', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                wrapper.setProps({ suggestions: suggestionsList });
                setFocusOnAutosuggest();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalledTimes(1);

                setFocusOnAutosuggest();
                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalledTimes(2);
            });
            it('should be called on deleting a suggestion by clicking on the x button next to it', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnAutosuggest();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();
                expect(wrapper.find('SuggestionTag')).toHaveLength(selectedSuggestions.length);

                wrapper.find('SuggestionTag').at(2).find('button').simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalledWith(selectedSuggestions[2]);
            });
            it('should be called on deleting a suggestion by hitting backspace in the empty input field', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnAutosuggest();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('input').simulate('keyDown', { key: 'Backspace' });

                expect(mockOnSelectionChange).toHaveBeenCalled();
            });
            it('should not be called on deleting a suggestion by hitting backspace in an input field with value', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnAutosuggest();
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
        it('should call onSubmit when hit Enter an empty input field', () => {
            setFocusOnAutosuggest();

            expect(mockOnSubmit).not.toHaveBeenCalled();
            wrapper.find('input').simulate('keyDown', { key: 'Enter' });
            expect(mockOnSubmit).toHaveBeenCalled();
        });
        it('should clear the input field when a suggestion was selected', () => {
            const textInputValue = 'driver';
            suggestionsList = SUGGESTIONS.slice(1, 20);
            wrapper.setProps({ suggestions: suggestionsList });
            wrapper.find('input').simulate('change', { target: { value: textInputValue } });
            setFocusOnAutosuggest();

            expect(wrapper.find('input').props().value).toEqual(textInputValue);

            wrapper.find('li').first().children().simulate('click');

            expect(wrapper.find('input').props().value).toEqual('');
        });
    });
});
