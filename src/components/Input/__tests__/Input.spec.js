import React from 'react';
import toJson from 'enzyme-to-json';
import { Input } from '../Input';

describe('<Input> that renders an input field', () => {
    const data = {
        target: {
            value: 'test',
        },
    };

    it('should render default input correctly', () => {
        const wrapper = shallow(<Input value="Some value" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render input with a label when it was passed', () => {
        const labelText = 'labelText';
        const wrapper = mount(<Input labelText={labelText} />);
        expect(wrapper.find('p').text()).toEqual(labelText);
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(<Input context="bad" size="large" isBlock disabled />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should call change callback correctly', () => {
        const onChange = jest.fn();
        const wrapper = shallow(<Input onChange={onChange} />);
        wrapper.find('input').simulate('change', data);
        expect(onChange).toHaveBeenCalledWith(data);
    });

    it('should add string html attributes correctly', () => {
        const wrapper = shallow(<Input data-test="something" />);
        expect(wrapper.find('input').prop('data-test')).toEqual('something');
    });
});
