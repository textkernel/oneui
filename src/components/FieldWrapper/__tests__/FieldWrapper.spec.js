import React from 'react';
import toJson from 'enzyme-to-json';
import { FieldWrapper } from '../FieldWrapper';

describe('FieldWrapper', () => {
    it('should render correctly', () => {
        const wrapper = mount(<FieldWrapper showArrow>some children</FieldWrapper>);

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('button')).toHaveLength(0);
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
