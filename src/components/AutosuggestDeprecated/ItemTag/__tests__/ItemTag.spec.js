import React from 'react';
import toJson from 'enzyme-to-json';
import { ItemTag } from '../ItemTag';

describe('ItemTag', () => {
    it('should render correctly', () => {
        const wrapper = mount(<ItemTag>tag</ItemTag>);

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('button')).toHaveLength(0);
    });
    it('should add delete button if onClick is defined', () => {
        const onClickMock = jest.fn();
        const wrapper = mount(<ItemTag onClick={onClickMock}>tag</ItemTag>);

        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should call onClick callback correctly', () => {
        const onClickMock = jest.fn();
        const wrapper = mount(<ItemTag onClick={onClickMock}>tag</ItemTag>);

        wrapper.find('button').simulate('click');

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
