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
        it('should render empty component correctly when focused', () => {
            setFocusOnInput();
            wrapper.setProps({ suggestions: [] });
            expect(wrapper.find('li')).toHaveLength(0);
            expect(inputNode).toBe(document.activeElement);
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
            wrapper.setProps({ suggestions: [] });
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
            setFocusOnInput();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('li')).toHaveLength(suggestions.length);
        });
        it('should use alternative list render function if passed', () => {
            const listRendererMock = jest.fn(() => <li>My list</li>);

            wrapper.setProps({ listRenderer: listRendererMock });
            setFocusOnInput();

            expect(listRendererMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    getItemProps: expect.any(Function),
                    inputValue: expect.any(String),
                    noSuggestionsPlaceholder: expect.any(String),
                    highlightedIndex: expect.any(Number),
                    suggestionToString: expect.any(Function),
                    suggestions: expect.any(Array),
                })
            );
            expect(wrapper.find('li')).toHaveLength(1);
        });
        it('should render Clear button when showClearButton is set to true', () => {
            const clearTitle = 'Clear';
            wrapper.setProps({ clearTitle, showClearButton: true });

            setFocusOnInput();
            wrapper
                .find('li')
                .first()
                .children()
                .simulate('click');
            wrapper.find('input').simulate('blur');

            expect(wrapper.find('Button').text()).toBe(clearTitle);
            expect(wrapper.find('li')).toHaveLength(0);
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
        it('should implement direct control functionality with a ref passed from the outside', () => {
            wrapper.setProps({
                ref: inputRef,
                focusedRenderer: mockRenderWithRef,
                blurredRenderer: mockRenderWithRef,
            });
            wrapper.update();
            const focusSpy = jest.spyOn(inputNode, 'focus');

            expect(inputNode).not.toBe(document.activeElement);
            expect(focusSpy).not.toHaveBeenCalled();

            setFocusOnInput();
            wrapper
                .find('li')
                .first()
                .children()
                .simulate('click');

            expect(inputNode).toBe(document.activeElement);
            expect(focusSpy).toHaveBeenCalled();

            wrapper.find('input').simulate('blur');

            expect(mockOnBlur).toHaveBeenCalled();
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

            setFocusOnInput();
            wrapper
                .find('li')
                .first()
                .children()
                .simulate('click');
            wrapper.find('input').simulate('blur');

            wrapper.find('Button').simulate('click');
            expect(mockOnClearAllSelected).toHaveBeenCalled();
        });
        it('should call onBlur', () => {
            setFocusOnInput();
            wrapper
                .find('li')
                .first()
                .children()
                .simulate('click');
            wrapper.find('input').simulate('blur');

            expect(mockOnBlur).toHaveBeenCalled();
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

            expect(inputNode).toBe(document.activeElement);
            expect(wrapper.find('li')).toHaveLength(suggestions.length);
        });
        it('should call onInputValueChange when typing into input field', () => {
            expect(mockOnInputValueChange).not.toHaveBeenCalled();

            wrapper.find('input').simulate('change', { target: { value: 'driver' } });

            expect(mockOnInputValueChange).toHaveBeenCalled();
        });
        it('should not clear the input field when a suggestion was selected', () => {
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
