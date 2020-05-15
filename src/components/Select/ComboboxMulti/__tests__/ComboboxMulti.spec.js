import React from 'react';
import toJson from 'enzyme-to-json';
import { ComboboxMulti } from '../ComboboxMulti';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../../Autosuggest/__mocks__/suggestions';

describe('ComboboxMulti', () => {
    const suggestionToString = SUGGESTION_TO_STRING;
    const inputPlaceholder = 'type here...';
    const noSuggestionsPlaceholder = 'No suggestions...';
    const mockOnSelectionChange = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnBlur = jest.fn();

    const suggestions = SUGGESTIONS;

    let wrapper;
    let inputNode;

    const setFocusOnInput = () => wrapper.find('input').simulate('click');

    beforeEach(() => {
        wrapper = mount(
            <ComboboxMulti
                suggestions={suggestions}
                suggestionToString={suggestionToString}
                inputPlaceholder={inputPlaceholder}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                onSelectionChange={mockOnSelectionChange}
                onInputValueChange={mockOnInputValueChange}
                onBlur={mockOnBlur}
            />
        );
        inputNode = wrapper.find('input').getDOMNode();
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should set focus on the input field', () => {
            setFocusOnInput();
            expect(inputNode).toBe(document.activeElement);
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
            wrapper.setProps({ suggestions: [] });
            setFocusOnInput();

            expect(wrapper.find('li')).toHaveLength(1);
            expect(wrapper.find('li').childAt(0).text()).toEqual(noSuggestionsPlaceholder);
        });
        it('should render all suggestions from the list', () => {
            setFocusOnInput();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('li')).toHaveLength(suggestions.length);
        });
        it('should render selection placeholder when component is not focused', () => {
            expect(wrapper.find('input').props().placeholder).toEqual(inputPlaceholder);
        });
    });
    describe('focusing and blurring the search field', () => {
        it('should set focus when wrapper element is clicked', () => {
            const focusSpy = jest.spyOn(inputNode, 'focus');

            expect(inputNode).not.toBe(document.activeElement);
            expect(focusSpy).not.toHaveBeenCalled();

            setFocusOnInput();

            expect(inputNode).toBe(document.activeElement);
            expect(focusSpy).toHaveBeenCalled();
        });
        it('should stay focused when suggestion is selected', () => {
            expect(inputNode).not.toBe(document.activeElement);

            setFocusOnInput();
            expect(inputNode).toBe(document.activeElement);

            wrapper.find('li').at(0).childAt(0).simulate('click');

            expect(inputNode).toBe(document.activeElement);
            expect(wrapper.find('li')).not.toHaveLength(0);
        });
        it('should blur on pressing Escape button', (done) => {
            const blurSpy = jest.spyOn(inputNode, 'blur');

            setFocusOnInput();

            expect(inputNode).toBe(document.activeElement);

            wrapper.find('input').simulate('blur').simulate('keyDown', { key: 'Escape' });

            setTimeout(() => {
                wrapper.update();
                expect(inputNode).not.toBe(document.activeElement);
                expect(blurSpy).toHaveBeenCalled();
                expect(mockOnBlur).toHaveBeenCalled();
                done();
            });
        });
        it('should clear input value on pressing Escape button', (done) => {
            const textInputValue = 'driver';

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
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

                wrapper.find('li').first().children().simulate('click');

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
            setFocusOnInput();
            wrapper.find('input').simulate('change', { target: { value: textInputValue } });

            expect(wrapper.find('input').props().value).toEqual(textInputValue);

            wrapper.find('li').first().children().simulate('click');

            expect(wrapper.find('input').props().value).toEqual(textInputValue);
        });
    });
});
