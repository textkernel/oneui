import React from 'react';
import toJson from 'enzyme-to-json';
import { SuggestionTag } from '../SuggestionTag';

describe('SuggestionTag', () => {
    it('should render nothing if no children are provided', () => {
        const wrapper = shallow(<SuggestionTag />);
        expect(wrapper.html()).toBeNull();
    });
    it('should render correctly', () => {
        const wrapper = mount(<SuggestionTag>tag</SuggestionTag>);

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('button')).toHaveLength(0);
    });
    it('should render correctly with styles modifier', () => {
        const wrapper = mount(<SuggestionTag width="block">tag</SuggestionTag>);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should add delete button if onClick is defined', () => {
        const onClickMock = jest.fn();
        const wrapper = mount(<SuggestionTag onClick={onClickMock}>tag</SuggestionTag>);

        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should call onClick callback correctly', () => {
        const onClickMock = jest.fn();
        const wrapper = mount(<SuggestionTag onClick={onClickMock}>tag</SuggestionTag>);

        wrapper.find('button').simulate('click');

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
