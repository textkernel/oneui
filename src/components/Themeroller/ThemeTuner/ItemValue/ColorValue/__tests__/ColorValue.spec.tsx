import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeColorItem } from '@textkernel/oneui';
import { ColorValue } from '../ColorValue';

describe('ColorValue component', () => {
    const item = { value: '#fffff' } as ThemeColorItem;

    let view: RenderResult;

    it('should render component correctly', () => {
        const onChangeMock = jest.fn();
        view = render(<ColorValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', '#fffff');
    });

    it('should invoke onChange callback when input is changed', async () => {
        const user = userEvent.setup();
        const inputValue = { value: '#00000' } as ThemeColorItem;
        const onChangeMock = jest.fn();
        render(<ColorValue item={item} onChange={onChangeMock(inputValue)} />);

        await user.click(screen.getByRole('textbox'));

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
