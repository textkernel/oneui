import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeNumberItem } from '@textkernel/oneui';
import { NumberValue } from '../NumberValue';

describe('NumberValue component', () => {
    const item = { value: '100' } as ThemeNumberItem;
    const inputValue = { value: '200' } as ThemeNumberItem;
    const role = 'numberselector';

    let view: RenderResult;

    it('should render component correctly', () => {
        view = render(<NumberValue item={item} onChange={jest.fn()} ariaRole={role} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole(role)).toHaveAttribute('value', '100');
    });

    it('should invoke onChange callback when input is changed', () => {
        const onChangeMock = jest.fn();
        render(<NumberValue item={item} onChange={onChangeMock(inputValue)} ariaRole={role} />);

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
