import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeColorItem } from '@textkernel/oneui';
import { ColorValue } from '../ColorValue';

describe('ColorValue component', () => {
    const item = { value: '#fffff' } as ThemeColorItem;
    const inputValue = { value: '#00000' } as ThemeColorItem;

    let view: RenderResult;

    it('should render component correctly', () => {
        const onChangeMock = jest.fn();
        view = render(<ColorValue item={item} onChange={onChangeMock} ariaRole="color" />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('color')).toHaveAttribute('value', '#fffff');
    });

    it('should invoke onChange callback when input is changed', () => {
        const onChangeMock = jest.fn();
        render(<ColorValue item={item} onChange={onChangeMock(inputValue)} />);

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
