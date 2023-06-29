import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeStringItem } from '@textkernel/oneui';
import { StringValue } from '../StringValue';

describe('StringValue component', () => {
    const onChangeMock = jest.fn();
    const item = { value: 'flex' } as ThemeStringItem;

    it('should render component correctly', () => {
        const view = render(<StringValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', 'flex');
    });

    it.skip('should invoke onChange callback when input is changed', async () => {
        const user = userEvent.setup();
        render(<StringValue item={item} onChange={onChangeMock} />);

        await user.type(screen.getByRole('textbox'), 'inline-block');

        expect(onChangeMock).toHaveBeenCalledWith({ value: 'inline-block' });
    });
});
