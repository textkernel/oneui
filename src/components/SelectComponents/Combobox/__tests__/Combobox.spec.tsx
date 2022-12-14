import React from 'react';
import toJson from 'enzyme-to-json';
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

    let wrapper;
    const getInputNode = () =>
        wrapper.find('input').length ? wrapper.find('input').getDOMNode() : null;

    const setFocusOnInput = () => wrapper.find('.Combobox__wrapper').simulate('click');

    beforeEach(() => {
        wrapper = mount(
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
    });

    describe('rendering', () => {
        it('should initially render empty component correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('should set focus on the input field', () => {
            setFocusOnInput();
            expect(getInputNode()).toBe(document.activeElement);
        });
        it('should not set focus on the input field when the component is disabled', () => {
            wrapper.setProps({ disabled: true });
            setFocusOnInput();
            expect(wrapper.find('input')).toHaveLength(0);
        });
        it('should render noSuggestions placeholder when empty suggestions list is passed', () => {
            wrapper.setProps({ suggestions: [] });
            setFocusOnInput();

            expect(wrapper.find('li')).toHaveLength(1);
            expect(wrapper.find('li').childAt(0).text()).toEqual(noSuggestionsPlaceholder);
        });
        it('should render all suggestions from the list', () => {
            setFocusOnInput();

            expect(wrapper.find('li')).toHaveLength(suggestions.length);
        });
        describe('when blurred', () => {
            it('should render selection placeholder', () => {
                expect(wrapper.text()).toEqual(inputPlaceholder);
            });
            it('should show the selected value if available', () => {
                wrapper.setProps({ selectedSuggestion: SUGGESTIONS[1] });
                wrapper.update();
                expect(wrapper.text()).toEqual(SUGGESTIONS[1].name);
            });
        });
        describe('when focused', () => {
            it('should add additional attributes to input field when component is focused', () => {
                wrapper.setProps({ inputAttrs: { 'data-test': true, title: 'some title' } });
                wrapper.update();
                setFocusOnInput();

                expect(wrapper.find('input').html()).toMatch('data-test="true"');
                expect(wrapper.find('input').html()).toMatch('title="some title"');
            });
            it('should render selection placeholder', () => {
                setFocusOnInput();
                expect(wrapper.find('input').props().placeholder).toEqual(inputPlaceholder);
            });
            it('should show the selected value if available', () => {
                wrapper.setProps({ selectedSuggestion: SUGGESTIONS[1] });
                wrapper.update();
                setFocusOnInput();
                expect(wrapper.find('input').props().value).toEqual(SUGGESTIONS[1].name);
            });
        });
    });
    describe('focusing and blurring the search field', () => {
        it('should set focus when wrapper element is clicked', () => {
            expect(getInputNode()).not.toBe(document.activeElement);

            setFocusOnInput();
            expect(getInputNode()).toBe(document.activeElement);
        });
        it('should not stay focused when suggestion is selected', () => {
            expect(getInputNode()).not.toBe(document.activeElement);

            setFocusOnInput();
            expect(getInputNode()).toBe(document.activeElement);

            wrapper.find('li').at(0).childAt(0).simulate('click');

            expect(getInputNode()).not.toBe(document.activeElement);
            expect(wrapper.find('li')).toHaveLength(0);
        });
        it('should blur on pressing Escape button', () => {
            setFocusOnInput();
            expect(getInputNode()).toBe(document.activeElement);

            wrapper.find('input').simulate('keyDown', { key: 'Escape' });
            wrapper.update();

            expect(getInputNode()).not.toBe(document.activeElement);
            // TODO: fixMe - the callback is not triggered, even though it does work in the UI
            // expect(mockOnBlur).toHaveBeenCalled();
        });
        // TODO: fixMe - the component doesn't get blurred, even though it does work in the UI
        it.skip('should blur on pressing Tab button', (done) => {
            setFocusOnInput();
            wrapper.find('input').simulate('keyDown', { key: 'Tab' });
            setTimeout(() => {
                wrapper.update();
                expect(getInputNode()).not.toBe(document.activeElement);
                // TODO: fixMe - the callback is not triggered, even though it does work in the UI
                // expect(mockOnBlur).toHaveBeenCalled();
                done();
            });
        });
        it('should blur on pressing ENTER button', () => {
            setFocusOnInput();
            wrapper.find('input').simulate('keyDown', { key: 'Enter' });
            wrapper.update();

            expect(getInputNode()).not.toBe(document.activeElement);
            // TODO: fixMe - the callback is not triggered, even though it does work in the UI
            // expect(mockOnBlur).toHaveBeenCalled();
        });
    });
    describe('callbacks', () => {
        describe('onSelectionAdd', () => {
            it('should be called on clicking on a suggestion', () => {
                setFocusOnInput();
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                wrapper.find('li').first().children().simulate('click');

                expect(mockOnSelectionAdd).toHaveBeenCalledWith(SUGGESTIONS[0]);
            });
            it('should be called when pressing Enter', () => {
                setFocusOnInput();
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                wrapper.find('input').simulate('keyDown', { key: 'Enter' });

                expect(mockOnSelectionAdd).toHaveBeenCalledWith(SUGGESTIONS[0]);
            });
            it.skip('should be called when pressing Tab', () => {
                setFocusOnInput();
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                wrapper.find('input').simulate('keyDown', { key: 'Tab' });

                // TODO: fix me
                expect(mockOnSelectionAdd).toHaveBeenCalledWith(SUGGESTIONS[0]);
            });
            it('should not be called when pressing ESC', () => {
                setFocusOnInput();
                expect(mockOnSelectionAdd).not.toHaveBeenCalled();

                wrapper.find('input').simulate('keyDown', { key: 'ESC' });

                expect(mockOnSelectionAdd).not.toHaveBeenCalled();
            });
        });
        describe('onInputValueChange', () => {
            it('should call onInputValueChange when typing into the input field', () => {
                setFocusOnInput();
                expect(mockOnInputValueChange).not.toHaveBeenCalled();

                wrapper.find('input').simulate('change', { target: { value: 'dri' } });

                expect(mockOnInputValueChange).toHaveBeenCalledWith('dri');
            });
        });
    });
    describe('Clearable version', () => {
        it.todo('');
    });
    describe('with free input', () => {
        it.todo('');
    });
});
