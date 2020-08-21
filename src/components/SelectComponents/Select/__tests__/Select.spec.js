import React from 'react';
import toJson from 'enzyme-to-json';
import { Select } from '../Select';
import { SUGGESTIONS, SUGGESTION_TO_STRING } from '../../../Autosuggest/__mocks__/suggestions';

describe('Select', () => {
    const mockOnChange = jest.fn();
    const mockOnBlur = jest.fn();
    const mockOnFocus = jest.fn();

    let wrapper;

    const clickWrapper = () => wrapper.find('.Select__wrapper').simulate('click');

    beforeEach(() => {
        wrapper = mount(
            <Select
                items={SUGGESTIONS}
                itemToString={SUGGESTION_TO_STRING}
                selectedItem={SUGGESTIONS[1]}
                onChange={mockOnChange}
                onFocus={mockOnFocus}
                onBlur={mockOnBlur}
            />
        );
    });

    describe('rendering', () => {
        it('should initially render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('.Select__selected').text()).toEqual(
                SUGGESTION_TO_STRING(SUGGESTIONS[1])
            );
        });
        it('should render focused component correctly', () => {
            clickWrapper();

            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('li')).toHaveLength(SUGGESTIONS.length);
            expect(wrapper.find('.Select__selected').text()).toEqual(
                SUGGESTION_TO_STRING(SUGGESTIONS[1])
            );
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
        it('should toggle list when arrow element is clicked', () => {
            // originally to be closed
            expect(wrapper.find('li')).toHaveLength(0);

            // open items list
            wrapper.find('.Select__dropdownIcon').at(0).simulate('click');
            expect(wrapper.find('li')).toHaveLength(SUGGESTIONS.length);

            // close items list
            wrapper.find('.Select__dropdownIcon').at(0).simulate('click');
            expect(wrapper.find('li')).toHaveLength(0);
        });
    });
    describe('callbacks', () => {
        describe('onFocus', () => {
            it('should be called on clicking when opening the dropdown', () => {
                expect(mockOnFocus).not.toHaveBeenCalled();
                clickWrapper();
                expect(mockOnFocus).toHaveBeenCalled();
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
    });
});
