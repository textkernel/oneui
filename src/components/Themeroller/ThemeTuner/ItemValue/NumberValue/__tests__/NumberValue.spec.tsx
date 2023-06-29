import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeNumberItem } from '@textkernel/oneui';
import { NumberValue } from '../NumberValue';

describe('NumberValue component', () => {
    const item = { value: '100' } as ThemeNumberItem;

    it('should render component correctly', () => {
        const onChangeMock = jest.fn();
        const view = render(<NumberValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', '100');
    });

    it.skip('should invoke onChange callback when input is changed', async () => {
        const onChangeMock = jest.fn();
        render(<NumberValue item={item} onChange={onChangeMock} />);
        const user = userEvent.setup();

        await user.type(screen.getByRole('textbox'), '200');

        expect(onChangeMock).toHaveBeenCalledWith({ value: '200' });
    });
});
