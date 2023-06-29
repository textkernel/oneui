import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeUnitItem } from '@textkernel/oneui';
import { UnitValue } from '../UnitValue';

describe('UnitValue component', () => {
    const onChangeMock = jest.fn();
    const item = {
        value: '12',
        unit: 'px',
    } as ThemeUnitItem;

    it('should render component correctly', () => {
        const view = render(<UnitValue item={item} onChange={onChangeMock} />);

        // expect(wrapper.find('.UnitValue__value').at(0).text()).toEqual('12px');
        expect(view.container).toMatchSnapshot();
    });

    it.skip('should invoke onChange callback when input is changed', () => {
        render(<UnitValue item={item} onChange={onChangeMock} />);
        // wrapper.find('input').simulate('change', {
        //     target: {
        //         value: '18',
        //     },
        // });
        expect(onChangeMock).toHaveBeenCalledWith({
            value: '18',
            unit: 'px',
        });
    });
});
