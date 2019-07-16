import React from 'react';
import toJson from 'enzyme-to-json';
import InputWrapper from '../InputWrapper';

describe('InputWrapper', () => {
    it('should render correctly', () => {
        const wrapper = mount(<InputWrapper>some children</InputWrapper>);

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('button')).toHaveLength(0);
    });
    it('should add clear button if showClearButton is true', () => {
        const wrapper = mount(
            <InputWrapper showClearButton clearLabel="Clear">
                some children
            </InputWrapper>
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should call onClear callback correctly', () => {
        const onClearMock = jest.fn();
        const wrapper = mount(
            <InputWrapper showClearButton clearLabel="Clear" onClear={onClearMock}>
                tag
            </InputWrapper>
        );

        wrapper.find('button').simulate('click');

        expect(onClearMock).toHaveBeenCalledTimes(1);
    });
});
