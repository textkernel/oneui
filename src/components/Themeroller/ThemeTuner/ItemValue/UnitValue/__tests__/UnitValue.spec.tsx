import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeUnitItem } from '@textkernel/oneui';
import { UnitValue } from '../UnitValue';

describe('UnitValue component', () => {
    const onChangeMock = jest.fn();
    const item = {
        value: '12',
        unit: 'px',
    } as ThemeUnitItem;
    const inputValue = {
        value: '12',
        unit: 'px',
    } as ThemeUnitItem;

    it('should render component correctly', () => {
        const view = render(<UnitValue item={item} onChange={onChangeMock} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('spinbutton')).toHaveAttribute('value', '12');
    });

    it('should invoke onChange callback when input is changed', async () => {
        render(<UnitValue item={item} onChange={onChangeMock(inputValue)} />);

        expect(onChangeMock).toHaveBeenCalledWith(inputValue);
    });
});
