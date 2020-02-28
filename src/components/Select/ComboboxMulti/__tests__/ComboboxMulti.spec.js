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

    const setFocusOnInput = () =>
        wrapper
            .find('.SelectBase__field')
            .first()
            .simulate('click');

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
                listOptimizerProps={{
                    defaultHeight: 800,
                    defaultWidth: 800,
                }}
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
            expect(
                wrapper
                    .find('li')
                    .childAt(0)
                    .text()
            ).toEqual(noSuggestionsPlaceholder);
        });
        it('should render all suggestions from the list', () => {
            setFocusOnInput();

            expect(toJson(wrapper)).toMatchSnapshot();
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
        it.skip('should stay focused when suggestion is selected', () => {
            expect(inputNode).not.toBe(document.activeElement);

            setFocusOnInput();
            expect(inputNode).toBe(document.activeElement);

            wrapper
                .find('li')
                .at(0)
                .childAt(0)
                .simulate('click');

            expect(inputNode).toBe(document.activeElement);
        });
        it('should blur on pressing Escape button', () => {
            const blurSpy = jest.spyOn(inputNode, 'blur');

            setFocusOnInput();

            expect(inputNode).toBe(document.activeElement);

            wrapper.find('input').simulate('keyDown', { key: 'Escape' });

            expect(inputNode).not.toBe(document.activeElement);
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
            const blurSpy = jest.spyOn(inputNode, 'blur');

            setFocusOnInput();

            expect(inputNode).toBe(document.activeElement);

            wrapper.find('input').simulate('keyDown', { key: 'Tab' });

            expect(blurSpy).toHaveBeenCalled();
            expect(mockOnBlur).toHaveBeenCalled();
        });
    });
    describe('callbacks', () => {
        describe('onSelectionChange', () => {
            it.skip('should be called on clicking on a suggestion', () => {
                setFocusOnInput();

                expect(mockOnSelectionChange).not.toHaveBeenCalled();

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
        it.skip('should not clear the input field when a suggestion was selected', () => {
            const textInputValue = 'driver';
            wrapper.find('input').simulate('change', { target: { value: textInputValue } });

            expect(wrapper.find('input').props().value).toEqual(textInputValue);

            wrapper
                .find('li')
                .first()
                .children()
                .simulate('click');

            expect(wrapper.find('input').props().value).toEqual(textInputValue);
        });
    });
});
