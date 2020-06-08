import React from 'react';
import toJson from 'enzyme-to-json';
import { AutosuggestMulti } from '../AutosuggestMulti';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../../Autosuggest/__mocks__/suggestions';

describe('AutosuggestMulti', () => {
    const suggestionToString = SUGGESTION_TO_STRING;
    const inputPlaceholder = 'type here...';
    const numberOfVisibleTags = 3;
    const mockOnSelectionChange = jest.fn();
    const mockOnSelectionRemove = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnBlur = jest.fn();

    let suggestionsList = [];
    let selectedSuggestions = [];

    let wrapper;
    const setFocusOnInput = () => wrapper.find('input').simulate('click');

    beforeEach(() => {
        wrapper = mount(
            <AutosuggestMulti
                isLoading={false}
                selectedSuggestions={selectedSuggestions}
                suggestions={suggestionsList}
                suggestionToString={suggestionToString}
                inputPlaceholder={inputPlaceholder}
                onSelectionChange={mockOnSelectionChange}
                onSelectionRemove={mockOnSelectionRemove}
                onInputValueChange={mockOnInputValueChange}
                numberOfVisibleTags={numberOfVisibleTags}
                onBlur={mockOnBlur}
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
        it('should render component with suggestions', () => {
            suggestionsList = SUGGESTIONS.slice(1, 20);
            wrapper.setProps({ suggestions: suggestionsList });
            setFocusOnInput();
            wrapper.find('input').simulate('change', { target: { value: 'driver' } });
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should render isLoading state', () => {
            suggestionsList = SUGGESTIONS.slice(1, 20);
            wrapper.setProps({ suggestions: [], isLoading: true });
            setFocusOnInput();
            wrapper.find('input').simulate('change', { target: { value: 'driver' } });
            expect(wrapper.find('.SuggestionsList__loaderItem')).toHaveLength(5);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should render empty component correctly when focused', async () => {
            setFocusOnInput();
            const inputNode = wrapper.find('input').getDOMNode();
            expect(document.activeElement).toBe(inputNode);
        });
        it('should render tag for each selected selection when component is focused', () => {
            selectedSuggestions = SUGGESTIONS.slice(0, 5);
            wrapper.setProps({ selectedSuggestions });
            setFocusOnInput();

            expect(wrapper.find('SuggestionTag')).toHaveLength(selectedSuggestions.length);
        });
        it('should render tag for each selected selection when component is blurred', () => {
            selectedSuggestions = SUGGESTIONS.slice(0, 5);
            wrapper.setProps({ selectedSuggestions });

            expect(wrapper.find('SuggestionTag')).toHaveLength(numberOfVisibleTags + 1);
        });
    });
    describe('focusing and blurring the search field', () => {
        it('should clear input value on pressing Escape button', (done) => {
            const textInputValue = 'driver';
            setFocusOnInput();
            wrapper.find('input').simulate('change', { target: { value: textInputValue } });
            expect(wrapper.find('input').props().value).toEqual(textInputValue);
            wrapper.find('input').simulate('blur').simulate('keyDown', { key: 'Escape' });
            setTimeout(() => {
                wrapper.update();
                expect(wrapper.find('input').props().value).toEqual('');
                done();
            });
        });
        it('should blur on pressing Tab button', (done) => {
            setFocusOnInput();
            wrapper.find('input').simulate('blur').simulate('keyDown', { key: 'Tab' });
            setTimeout(() => {
                wrapper.update();
                expect(mockOnBlur).toHaveBeenCalled();
                done();
            });
        });
    });
    describe('callbacks', () => {
        describe('onSelectionChange', () => {
            it('should be called on clicking on a suggestion', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                wrapper.setProps({ suggestions: suggestionsList });
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('input').simulate('change', { target: { value: 'a' } });
                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalled();
            });
            it('should be called also when clicking on a suggestion the second time in a row', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                wrapper.setProps({ suggestions: suggestionsList });
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalledTimes(1);

                setFocusOnInput();
                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionChange).toHaveBeenCalledTimes(2);
            });
            it('should be called on deleting a suggestion by clicking on the x button next to it', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();
                expect(wrapper.find('SuggestionTag')).toHaveLength(selectedSuggestions.length);

                wrapper.find('SuggestionTag').at(2).find('button').simulate('click');

                expect(mockOnSelectionRemove).toHaveBeenCalledWith(selectedSuggestions[2]);
            });
            it('should be called on deleting a suggestion by hitting backspace in the empty input field', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnInput();

                expect(mockOnSelectionRemove).not.toHaveBeenCalled();

                wrapper.find('input').simulate('keyDown', { key: 'Backspace' });

                expect(mockOnSelectionRemove).toHaveBeenCalled();
            });
            it('should not be called on deleting a suggestion by hitting backspace in an input field with value', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnInput();
                wrapper.find('input').simulate('change', { target: { value: 'driver' } });

                expect(mockOnSelectionRemove).not.toHaveBeenCalled();

                wrapper.find('input').simulate('keyDown', { key: 'Backspace' });

                expect(mockOnSelectionRemove).not.toHaveBeenCalled();
            });
        });
        it('should call onInputValueChange when typing into input field', () => {
            expect(mockOnInputValueChange).not.toHaveBeenCalled();

            wrapper.find('input').simulate('change', { target: { value: 'driver' } });

            expect(mockOnInputValueChange).toHaveBeenCalled();
        });
        it('should clear the input field when a suggestion was selected', () => {
            const textInputValue = 'driver';
            suggestionsList = SUGGESTIONS.slice(1, 20);
            wrapper.setProps({ suggestions: suggestionsList });
            wrapper.find('input').simulate('change', { target: { value: textInputValue } });
            setFocusOnInput();

            expect(wrapper.find('input').props().value).toEqual(textInputValue);

            wrapper.find('li').first().children().simulate('click');

            expect(wrapper.find('input').props().value).toEqual('');
        });
    });
});
