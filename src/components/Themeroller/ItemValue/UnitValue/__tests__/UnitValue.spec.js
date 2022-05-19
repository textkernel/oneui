import React from 'react';
import toJson from 'enzyme-to-json';
import { UnitValue } from '../UnitValue';

describe('UnitValue component', () => {
    const onChangeMock = jest.fn();
    const item = {
        value: '12',
        unit: 'px',
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly', () => {
        const wrapper = mount(<UnitValue item={item} onChange={onChangeMock} />);
        expect(wrapper.find('.UnitValue__value').at(0).text()).toEqual('12px');
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should invoke onChange callback when input is changed', () => {
        const wrapper = mount(<UnitValue item={item} onChange={onChangeMock} />);
        wrapper.find('input').simulate('change', {
            target: {
                value: '18',
            },
        });
        expect(onChangeMock).toHaveBeenCalledWith({
            value: '18',
            unit: 'px',
        });
    });
});
