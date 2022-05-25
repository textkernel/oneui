import React from 'react';
import toJson from 'enzyme-to-json';
import { StringValue } from '../StringValue';

describe('StringValue component', () => {
    const onChangeMock = jest.fn();
    const item = { value: 'flex' };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly', () => {
        const wrapper = mount(<StringValue item={item} onChange={onChangeMock} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke onChange callback when input is changed', () => {
        const wrapper = mount(<StringValue item={item} onChange={onChangeMock} />);
        wrapper.find('input').simulate('change', {
            target: {
                value: 'inline-block',
            },
        });
        expect(onChangeMock).toHaveBeenCalledWith({ value: 'inline-block' });
    });
});
