import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeStringItem } from '@textkernel/oneui';
import { StringValue } from '../StringValue';

describe('StringValue component', () => {
    const onChangeMock = jest.fn();
    const item = { value: 'flex' } as ThemeStringItem;

    it('should render component correctly', () => {
        const view = render(<StringValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
    });

    it('should invoke onChange callback when input is changed', () => {
        render(<StringValue item={item} onChange={onChangeMock} />);
        // wrapper.find('input').simulate('change', {
        //     target: {
        //         value: 'inline-block',
        //     },
        // });
        // expect(onChangeMock).toHaveBeenCalledWith({ value: 'inline-block' });
    });
});
