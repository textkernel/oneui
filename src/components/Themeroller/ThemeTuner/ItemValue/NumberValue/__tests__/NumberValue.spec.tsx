import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeNumberItem } from '@textkernel/oneui';
import { NumberValue } from '../NumberValue';

describe('NumberValue component', () => {
    const item = { value: '100' } as ThemeNumberItem;

    let view: RenderResult;

    it('should render component correctly', () => {
        const onChangeMock = jest.fn();
        view = render(<NumberValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', '100');
    });

    it('should invoke onChange callback when input is changed', async () => {
        const inputValue = { value: '200' } as ThemeNumberItem;
        const user = userEvent.setup();
        const onChangeMock = jest.fn();
        render(<NumberValue item={item} onChange={onChangeMock(inputValue)} />);

        await user.click(screen.getByRole('textbox'));

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
