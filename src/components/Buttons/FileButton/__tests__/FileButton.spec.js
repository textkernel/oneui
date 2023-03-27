import React from 'react';
import toJson from 'enzyme-to-json';
import { FileButton } from '../FileButton';

describe('<FileButton> that renders a button', () => {
    it('should render default button correctly', () => {
        const wrapper = mount(<FileButton>Choose file</FileButton>);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.text()).toEqual('Choose file');
        expect(wrapper.find('label')).toHaveLength(1);
    });
    it('should add classes when props are changed', () => {
        const wrapper = mount(
            <FileButton size="large" isBlock>
                Click me
            </FileButton>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call click callback correctly', () => {
        const onChangeMock = jest.fn();
        const wrapper = mount(<FileButton onChange={onChangeMock}>Click me</FileButton>);
        wrapper.find('input').simulate('change');
        expect(onChangeMock).toHaveBeenCalled();
    });
});
