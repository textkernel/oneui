import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemerollerConfig } from '@textkernel/oneui';
import { Themeroller } from '../Themeroller';

const ThemeRollerTestConfig = [
    {
        fieldsetName: 'Colors',
        items: [
            {
                label: 'Background color',
                type: 'color',
                var: '--color-background',
                value: '#ffffff',
            },
            {
                label: 'Foreground color',
                type: 'color',
                var: '--color-neutral',
                value: '#1d1d1b',
            },
            {
                label: 'Border radius',
                type: 'unit',
                var: '--border-radius',
                value: '3',
                unit: 'px',
            },
            {
                label: 'Link decoration',
                type: 'string',
                var: '--link-decoration-normal',
                value: 'none',
            },
        ],
    },
    {
        fieldsetName: 'Sizing',
        items: [],
    },
] as ThemerollerConfig;

describe('Themeroller component', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component correctly', () => {
        const view = render(<Themeroller config={ThemeRollerTestConfig} onChange={() => {}} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getAllByRole('listitem')).toHaveLength(4);
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getAllByRole('tab')).toHaveLength(2);
        expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
});
