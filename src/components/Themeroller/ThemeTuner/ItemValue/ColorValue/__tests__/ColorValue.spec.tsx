import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeColorItem } from '@textkernel/oneui';
import { ColorValue } from '../ColorValue';

describe('ColorValue component', () => {
    const onChangeMock = jest.fn();
    const item = { value: '#fffff' } as ThemeColorItem;

    it('should render component correctly', () => {
        const view = render(<ColorValue item={item} onChange={onChangeMock} />);

        // expect(wrapper.find('.ColorValue__value').at(0).text()).toEqual('#fffff');
        expect(view.container).toMatchSnapshot();
    });

    it('should invoke onChange callback when input is changed', () => {
        render(<ColorValue item={item} onChange={onChangeMock} />);
        // wrapper.find('input').simulate('change', {
        //     target: {
        //         value: '#00000',
        //     },
        // });
        // expect(onChangeMock).toHaveBeenCalledWith({ value: '#00000' });
    });
});
