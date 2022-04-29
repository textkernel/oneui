import React from 'react';
import toJson from 'enzyme-to-json';
import { Select } from '../Select';
import {
    SUGGESTIONS,
    SUGGESTION_TO_STRING,
} from '../../../AutosuggestDeprecated/__mocks__/suggestions';

describe('Select', () => {
    const mockOnChange = jest.fn();
    const mockOnBlur = jest.fn();
    const mockOnClear = jest.fn();

    let wrapper;

    const clickWrapper = () => wrapper.find('.Select__wrapper').simulate('click');
    const selectionText = () => wrapper.find('.Select__selected').text();

    beforeEach(() => {
        wrapper = mount(
            <Select
                items={SUGGESTIONS}
                itemToString={SUGGESTION_TO_STRING}
                selectedItem={SUGGESTIONS[1]}
                onChange={mockOnChange}
                onBlur={mockOnBlur}
                onClear={mockOnClear}
            />
        );
    });

    describe('rendering', () => {
        it('should initially render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(selectionText()).toEqual(SUGGESTION_TO_STRING(SUGGESTIONS[1]));
        });
        it('should render focused component correctly', () => {
            clickWrapper();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('li')).toHaveLength(SUGGESTIONS.length);
            expect(selectionText()).toEqual(SUGGESTION_TO_STRING(SUGGESTIONS[1]));
        });
    });
    describe('toggling items list', () => {
        it('should open list when wrapper element is clicked', () => {
            // originally to be closed
            expect(wrapper.find('li')).toHaveLength(0);

            // open items list
            clickWrapper();
            expect(wrapper.find('li')).toHaveLength(SUGGESTIONS.length);
        });
        it('should open list when arrow element is clicked', () => {
            // originally to be closed
            expect(wrapper.find('li')).toHaveLength(0);

            // open items list
            wrapper.find('svg').at(0).simulate('click');
            expect(wrapper.find('li')).toHaveLength(SUGGESTIONS.length);

            // select item
            wrapper.find('li').first().children().simulate('click');
            expect(wrapper.find('li')).toHaveLength(0);
        });
    });

    describe('toggling items list', () => {
        it('should open list when wrapper element is clicked', () => {
            // originally to be closed
            expect(wrapper.find('li')).toHaveLength(0);

            // open items list
            clickWrapper();
            expect(wrapper.find('li')).toHaveLength(SUGGESTIONS.length);
        });
        it('should open list when arrow element is clicked', () => {
            // originally to be closed
            expect(wrapper.find('li')).toHaveLength(0);

            // open items list
            wrapper.find('svg').at(0).simulate('click');
            expect(wrapper.find('li')).toHaveLength(SUGGESTIONS.length);

            // select item
            wrapper.find('li').first().children().simulate('click');
            expect(wrapper.find('li')).toHaveLength(0);
        });
    });

    describe('placeholder', () => {
        it('should show placeholder correctly', () => {
            expect(selectionText()).toEqual('Moon');

            wrapper.setProps({ selectedItem: undefined });
            expect(selectionText()).toEqual('');

            wrapper.setProps({ placeholder: 'Choose...' });
            expect(selectionText()).toEqual('Choose...');

            clickWrapper();
            expect(selectionText()).toEqual('Choose...');
        });
    });

    describe('callbacks', () => {
        describe('onFocus', () => {
            it('should be called on clicking when opening the dropdown', (done) => {
                const focusedElement = wrapper.find('.Select__wrapper').getDOMNode();
                const focusSpy = jest.spyOn(focusedElement, 'focus');

                expect(focusSpy).not.toHaveBeenCalled();

                clickWrapper();
                focusedElement.focus();
                setTimeout(() => {
                    expect(focusSpy).toHaveBeenCalled();
                    done();
                });
            });
        });
        describe('onBlur', () => {
            it('should be called on clicking when closing the dropdown', () => {
                expect(mockOnBlur).not.toHaveBeenCalled();
                clickWrapper();
                expect(mockOnBlur).not.toHaveBeenCalled();
                clickWrapper();
                expect(mockOnBlur).toHaveBeenCalled();
            });
            it('should be called on clicking when selecting an item', () => {
                expect(mockOnBlur).not.toHaveBeenCalled();
                clickWrapper();
                expect(mockOnBlur).not.toHaveBeenCalled();
                wrapper.find('li').first().children().simulate('click');
                expect(mockOnBlur).toHaveBeenCalled();
            });
        });
        describe('onChange', () => {
            it('should be called on clicking on a suggestion', () => {
                clickWrapper();
                expect(mockOnChange).not.toHaveBeenCalled();
                wrapper.find('li').first().children().simulate('click');
                expect(mockOnChange).toHaveBeenCalled();
            });
            it('should not be called on simply closing the dropdown', () => {
                clickWrapper();
                expect(mockOnChange).not.toHaveBeenCalled();
                clickWrapper();
                expect(mockOnChange).not.toHaveBeenCalled();
            });
        });
        describe('onClear', () => {
            it('should be called on clicking on a clear button', () => {
                expect(mockOnClear).not.toHaveBeenCalled();

                wrapper.find('button').simulate('click');
                expect(mockOnClear).toHaveBeenCalled();
            });
        });
    });
});
