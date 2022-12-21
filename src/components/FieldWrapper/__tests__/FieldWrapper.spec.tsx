import React from 'react';
import toJson from 'enzyme-to-json';
import { FieldWrapper } from '../FieldWrapper';
import { ENTER_KEY } from '../../../constants';

describe('FieldWrapper', () => {
    it('should render correctly', () => {
        const wrapper = mount(<FieldWrapper>some children</FieldWrapper>);

        expect(wrapper.find('.FieldWrapper__dropdownIcon').exists()).toBeFalsy();
        expect(wrapper.find('button')).toHaveLength(0);
        expect(wrapper.find('IoMdArrowDropdown').exists()).toBeFalsy();
        expect(wrapper.find('IoMdArrowDropup').exists()).toBeFalsy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should add clear button if showClearButton is true', () => {
        const wrapper = mount(
            <FieldWrapper showClearButton clearLabel="Clear">
                some children
            </FieldWrapper>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should render arrow icon pointing down', () => {
        const wrapper = mount(<FieldWrapper showArrow>some children</FieldWrapper>);

        expect(wrapper.find('.FieldWrapper__dropdownIcon').exists()).toBeTruthy();
        expect(wrapper.find('IoMdArrowDropdown').exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render arrow icon pointing up', () => {
        const wrapper = mount(
            <FieldWrapper showArrow isArrowUp>
                some children
            </FieldWrapper>
        );

        expect(wrapper.find('.FieldWrapper__dropdownIcon').exists()).toBeTruthy();
        expect(wrapper.find('IoMdArrowDropup').exists()).toBeTruthy();
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onArrowClick when arrow is clicked', () => {
        const onArrowClickMock = jest.fn();
        const wrapper = mount(
            <FieldWrapper showArrow onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        wrapper.find('IoMdArrowDropdown').simulate('click');
        expect(onArrowClickMock).toHaveBeenCalledTimes(1);

        wrapper.setProps({ isArrowUp: true });
        wrapper.find('IoMdArrowDropup').simulate('click');
        expect(onArrowClickMock).toHaveBeenCalledTimes(2);
    });
    it('should call onArrowClick when arrow is accessed by keyboard', () => {
        const onArrowClickMock = jest.fn();
        const wrapper = mount(
            <FieldWrapper showArrow onArrowClick={onArrowClickMock}>
                some children
            </FieldWrapper>
        );

        wrapper.find('IoMdArrowDropdown').simulate('keydown', { key: 'S' });
        expect(onArrowClickMock).toHaveBeenCalledTimes(0);

        wrapper.find('IoMdArrowDropdown').simulate('keydown', { key: ENTER_KEY });
        expect(onArrowClickMock).toHaveBeenCalledTimes(1);

        wrapper.setProps({ isArrowUp: true });
        wrapper.find('IoMdArrowDropup').simulate('keydown', { key: ENTER_KEY });
        expect(onArrowClickMock).toHaveBeenCalledTimes(2);
    });
    it('should call onClear callback correctly', () => {
        const onClearMock = jest.fn();
        const wrapper = mount(
            <FieldWrapper showClearButton clearLabel="Clear" onClear={onClearMock}>
                tag
            </FieldWrapper>
        );

        wrapper.find('button').simulate('click');

        expect(onClearMock).toHaveBeenCalledTimes(1);
    });
});
