import React from 'react';
import toJson from 'enzyme-to-json';
import { NumberValue } from '../NumberValue';

describe('NumberValue component', () => {
    const onChangeMock = jest.fn();
    const item = { value: '100' };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly', () => {
        const wrapper = mount(<NumberValue item={item} onChange={onChangeMock} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke onChange callback when input is changed', () => {
        const wrapper = mount(<NumberValue item={item} onChange={onChangeMock} />);
        wrapper.find('input').simulate('change', {
            target: {
                value: '200',
            },
        });
        expect(onChangeMock).toHaveBeenCalledWith({ value: '200' });
    });
});
