import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeColorItem } from '@textkernel/oneui';
import { ColorValue } from '../ColorValue';

describe('ColorValue component', () => {
    const item = { value: '#fffff' } as ThemeColorItem;

    it('should render component correctly', () => {
        const onChangeMock = jest.fn();
        const view = render(<ColorValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', '#fffff');
    });

    it.skip('should invoke onChange callback when input is changed', async () => {
        const onChangeMock = jest.fn();
        const user = userEvent.setup();

        await user.type(screen.getByRole('textbox'), '#00000');

        expect(onChangeMock).toHaveBeenCalledWith({ value: '#00000' });
    });
});
