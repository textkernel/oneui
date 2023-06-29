import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        const user = userEvent.setup();
        render(<StringValue item={item} onChange={onChangeMock(inputValue)} />);

        await user.click(screen.getByRole('textbox'));

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
