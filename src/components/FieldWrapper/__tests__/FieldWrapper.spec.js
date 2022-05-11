import React from 'react';
import toJson from 'enzyme-to-json';
import { FieldWrapper } from '../FieldWrapper';

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
