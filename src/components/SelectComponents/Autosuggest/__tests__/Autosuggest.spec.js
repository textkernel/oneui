import React from 'react';
import toJson from 'enzyme-to-json';
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
    let selectedSuggestions = [];

    let wrapper;
    const setFocusOnInput = () => wrapper.find('input').simulate('click');

    beforeEach(() => {
        wrapper = mount(
            <Autosuggest
                isLoading={false}
                selectedSuggestions={selectedSuggestions}
                suggestions={suggestionsList}
                suggestionToString={suggestionToString}
                inputPlaceholder={inputPlaceholder}
                onSelectionAdd={mockOnSelectionAdd}
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
        it('should initially render focused component correctly', () => {
            setFocusOnInput();
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('ListItem')).toHaveLength(0);
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
        it('should render mix suggestions and loader if allowMixingSuggestionsAndLoading is set to true', () => {
            suggestionsList = SUGGESTIONS.slice(1, 3);
            wrapper.setProps({
                suggestions: suggestionsList,
                isLoading: true,
                allowMixingSuggestionsAndLoading: true,
            });
            setFocusOnInput();
            wrapper.find('input').simulate('change', { target: { value: 'driver' } });
            expect(wrapper.find('ListItem')).toHaveLength(7);
            expect(wrapper.find('.SuggestionsList__loaderItem')).toHaveLength(5);
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
        it('should set ref on input field, when passed', () => {
            const inputRef = React.createRef();
            wrapper.setProps({ inputRef });
            expect(inputRef.current).not.toBe(null);
        });
        it('should set input value to custom value when focuses', () => {
            const initInputValue = 'custom input value';
            wrapper.setProps({ initInputValue });
            setFocusOnInput();
            expect(wrapper.find('input').getDOMNode().value).toEqual(initInputValue);
        });
        it('should render blurred state with custom params', () => {
            const customTag = <div className="find-me">Custom thing</div>;
            const anotherInputPlaceholder = 'Something else...';
            wrapper.setProps({
                customBlurParams: {
                    selectionIndicator: customTag,
                    isInputHidden: false,
                    inputPlaceholder: anotherInputPlaceholder,
                },
            });
            expect(wrapper.find('.find-me')).toHaveLength(1);
            expect(wrapper.find('input')).toHaveLength(1);
            expect(wrapper.find('.Autosuggest__input--hidden')).toHaveLength(0);
            expect(wrapper.find('input').getDOMNode().placeholder).toEqual(anotherInputPlaceholder);
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
        describe('onSelectionAdd', () => {
            it('should be called on clicking on a suggestion', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                wrapper.setProps({ suggestions: suggestionsList });
                setFocusOnInput();

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                wrapper.find('input').simulate('change', { target: { value: 'a' } });
                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionAdd).toHaveBeenCalled();
            });
            it('should be called also when clicking on a suggestion the second time in a row', () => {
                suggestionsList = SUGGESTIONS.slice(1, 20);
                wrapper.setProps({ suggestions: suggestionsList });
                setFocusOnInput();

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                wrapper.find('input').simulate('change', { target: { value: 'a' } });
                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionAdd).toHaveBeenCalledTimes(1);

                setFocusOnInput();
                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionAdd).toHaveBeenCalledTimes(2);
            });
            it('should be called on deleting a suggestion by clicking on the x button next to it', () => {
                selectedSuggestions = SUGGESTIONS.slice(0, 5);
                wrapper.setProps({ selectedSuggestions });
                setFocusOnInput();

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();
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
