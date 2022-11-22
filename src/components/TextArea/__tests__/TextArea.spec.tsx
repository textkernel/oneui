import React from 'react';
import toJson from 'enzyme-to-json';
import { TextArea } from '../TextArea';

describe('<TextArea> that renders a textarea', () => {
    const data = {
        target: {
            value: 'test',
        },
    };

    it('should render default textarea correctly', () => {
        const wrapper = shallow(<TextArea defaultValue="Some value" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(<TextArea context="bad" size="large" isBlock disabled />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should call change callback correctly', () => {
        const onChange = jest.fn();
        const wrapper = shallow(<TextArea onChange={onChange} />);
        wrapper.find('textarea').simulate('change', data);
        expect(onChange).toHaveBeenCalledWith(data);
    });

    it('should add string html attributes correctly', () => {
        const wrapper = shallow(<TextArea data-test="something" />);
        expect(wrapper.find('textarea').prop('data-test')).toEqual('something');
    });
});
