import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeNumberItem } from '@textkernel/oneui';
import { NumberValue } from '../NumberValue';

describe('NumberValue component', () => {
    const item = { value: '100' } as ThemeNumberItem;
    const inputValue = { value: '200' } as ThemeNumberItem;

    let view: RenderResult;

    it.skip('should render component correctly', () => {
        const onChangeMock = jest.fn();
        view = render(<NumberValue item={item} onChange={onChangeMock} ariaRole="number" />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', '100');
    });

    it.skip('should invoke onChange callback when input is changed', () => {
        const onChangeMock = jest.fn();
        render(<NumberValue item={item} onChange={onChangeMock(inputValue)} />);

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
