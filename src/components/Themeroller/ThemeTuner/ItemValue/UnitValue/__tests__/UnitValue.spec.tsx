import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ThemeUnitItem } from '@textkernel/oneui';
import { UnitValue } from '../UnitValue';

describe('UnitValue component', () => {
    const onChangeMock = jest.fn();
    const item = {
        value: '12',
        unit: 'px',
    } as ThemeUnitItem;

    it('should render component correctly', () => {
        const view = render(<UnitValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toHaveAttribute('value', '12');
    });

    it('should invoke onChange callback when input is changed', async () => {
        const inputValue = {
            value: '12',
            unit: 'px',
        } as ThemeUnitItem;
        const user = userEvent.setup();
        render(<UnitValue item={item} onChange={onChangeMock(inputValue)} />);

        await user.click(screen.getByRole('textbox'));

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
