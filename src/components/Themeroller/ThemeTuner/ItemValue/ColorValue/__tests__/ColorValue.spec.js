import React from 'react';
import toJson from 'enzyme-to-json';
import { ColorValue } from '../ColorValue';

describe('ColorValue component', () => {
    const onChangeMock = jest.fn();
    const item = { value: '#fffff' };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly', () => {
        const wrapper = mount(<ColorValue item={item} onChange={onChangeMock} />);
        expect(wrapper.find('.ColorValue__value').at(0).text()).toEqual('#fffff');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke onChange callback when input is changed', () => {
        const wrapper = mount(<ColorValue item={item} onChange={onChangeMock} />);
        wrapper.find('input').simulate('change', {
            target: {
                value: '#00000',
            },
        });
        expect(onChangeMock).toHaveBeenCalledWith({ value: '#00000' });
    });
});
