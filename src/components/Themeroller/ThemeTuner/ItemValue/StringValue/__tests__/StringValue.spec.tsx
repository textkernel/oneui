import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeStringItem } from '@textkernel/oneui';
import { StringValue } from '../StringValue';

describe('StringValue component', () => {
    const onChangeMock = jest.fn();
    const item = { value: 'flex' } as ThemeStringItem;

    let view: RenderResult;

    it('should render component correctly', () => {
        view = render(<StringValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', 'flex');
    });

    it('should invoke onChange callback when input is changed', async () => {
        const inputValue = { value: 'inline-block' } as ThemeStringItem;
        render(<StringValue item={item} onChange={onChangeMock(inputValue)} />);

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
