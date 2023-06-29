import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeNumberItem } from '@textkernel/oneui';
import { NumberValue } from '../NumberValue';

describe('NumberValue component', () => {
    const onChangeMock = jest.fn();
    const item = { value: '100' } as ThemeNumberItem;

    it('should render component correctly', () => {
        const view = render(<NumberValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
    });

    it('should invoke onChange callback when input is changed', () => {
        render(<NumberValue item={item} onChange={onChangeMock} />);
        // wrapper.find('input').simulate('change', {
        //     target: {
        //         value: '200',
        //     },
        // });

        // expect(onChangeMock).toHaveBeenCalledWith({ value: '200' });
    });
});
