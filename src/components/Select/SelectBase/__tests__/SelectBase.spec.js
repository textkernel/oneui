import React from 'react';
import toJson from 'enzyme-to-json';
import { SelectBase } from '../SelectBase';
import { SuggestionsList } from '../../SuggestionsList';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../../Autosuggest/__mocks__/suggestions';

describe('SelectBase', () => {
    const inputRef = React.createRef();
    const suggestions = SUGGESTIONS;
    const suggestionToString = SUGGESTION_TO_STRING;
    const noSuggestionsPlaceholder = 'No suggestions...';
    const mockOnSelectionChange = jest.fn();
    const mockOnInputValueChange = jest.fn();
    const mockOnClearAllSelected = jest.fn();
    const mockOnBlur = jest.fn();
    const mockRender = jest.fn(({ getInputProps }) => <input {...getInputProps()} />);
    const mockRenderWithRef = jest.fn(({ getInputProps }) => (
        <input ref={inputRef} {...getInputProps()} />
    ));

    let wrapper;
    let inputNode;

    const setFocusOnInput = () =>
        wrapper
            .find('.SelectBase__field')
            .at(1)
            .simulate('click');

    beforeEach(() => {
        wrapper = mount(
            <SelectBase
                suggestions={suggestions}
                suggestionToString={suggestionToString}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                listRenderer={listProps => <SuggestionsList {...listProps} />}
                focusedRenderer={mockRender}
                blurredRenderer={mockRender}
                onSelectionChange={mockOnSelectionChange}
                onInputValueChange={mockOnInputValueChange}
                onClearAllSelected={mockOnClearAllSelected}
                onBlur={mockOnBlur}
            />
        );
        inputNode = wrapper.find('input').getDOMNode();
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should render Clear button when showClearButton is set to true', () => {
            const clearTitle = 'Clear';
            wrapper.setProps({ clearTitle, showClearButton: true });

            expect(wrapper.find('Button').text()).toBe(clearTitle);
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
        it('should be able to get a component by ref sent as a prop', () => {
            wrapper.setProps({
                ref: inputRef,
                focusedRenderer: mockRenderWithRef,
                blurredRenderer: mockRenderWithRef,
            });
            wrapper.update();

            expect(wrapper.find('input').getElement().ref).toBeTruthy();
        });
        it('should lose focus when suggestion is selected', () => {
            expect(inputNode).not.toBe(document.activeElement);

            setFocusOnInput();

            wrapper
                .find('li')
                .at(0)
                .children()
                .simulate('click');

            expect(wrapper.find('li')).toHaveLength(0);
            expect(wrapper.find('FieldWrapper').prop('isFocused')).toBeFalsy();
        });
    });
    describe('callbacks', () => {
        describe('onSelectionChange', () => {
            it('should be called on clicking on a suggestion', () => {
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
        it('should call onClearAllSelected on Clear button click', () => {
            const clearTitle = 'Clear';
            wrapper.setProps({ clearTitle, showClearButton: true });

            wrapper.find('Button').simulate('click');
            expect(mockOnClearAllSelected).toHaveBeenCalled();
        });
        // Despite everything is working good in real-case scenario,
        // 'blur' event can not be simulated in the way Downshift component to understand it.
        it.skip('should call onBlur', () => {
            setFocusOnInput();
            wrapper.find('SelectBase').simulate('blur');

            expect(mockOnBlur).toHaveBeenCalled();
        });
        it('should stay focused when suggestion is selected with keepExpandedAfterSelection set to true', () => {
            wrapper.setProps({ keepExpandedAfterSelection: true });
            expect(inputNode).not.toBe(document.activeElement);

            setFocusOnInput();
            expect(inputNode).toBe(document.activeElement);

            wrapper
                .find('li')
                .at(0)
                .childAt(0)
                .simulate('click');

            expect(wrapper.find('li')).toHaveLength(suggestions.length);
        });
        it('should call onInputValueChange when typing into input field', () => {
            expect(mockOnInputValueChange).not.toHaveBeenCalled();

            wrapper.find('input').simulate('change', { target: { value: 'driver' } });

            expect(mockOnInputValueChange).toHaveBeenCalled();
        });
        it('should clear the input field when a suggestion was selected', () => {
            const textInputValue = 'driver';
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
