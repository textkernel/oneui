import React from 'react';
import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemerollerConfig } from '@textkernel/oneui';
import { ThemeTuner } from '../ThemeTuner';

export const ThemeRollerTestConfig = [
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
                var: '--color-foreground',
                value: '#000000',
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

describe('ThemeTuner component', () => {
    let view: RenderResult;

    it('should render component correctly', () => {
        const onChangeMock = jest.fn();
        view = render(
            <ThemeTuner
                config={ThemeRollerTestConfig}
                cssVars={{
                    '--color-foreground': '#000000',
                }}
                onChange={onChangeMock}
            />
        );

        const itemsList = screen.getAllByRole('listitem');
        const inputTextBox = screen.getByRole('textbox');
        const inputSpinButton = screen.getByRole('spinbutton');

        expect(screen.getByRole('tab', { hidden: true, name: 'Colors' })).toBeVisible();
        expect(screen.getByRole('tab', { hidden: true, name: 'Sizing' })).toBeVisible();

        expect(itemsList).toHaveLength(4);

        expect(itemsList[0].children[0].textContent).toBe('Background color');
        expect(itemsList[0].children[1].textContent).toBe('#ffffff');

        expect(itemsList[1].children[0].textContent).toBe('Foreground color');
        expect(itemsList[1].children[1].textContent).toBe('#000000');

        expect(itemsList[2].children[0].textContent).toBe('Border radius');
        expect(itemsList[2].children[1].textContent).toBe('3px');

        expect(itemsList[3].children[0].textContent).toBe('Link decoration');
        expect(itemsList[3].children[1].textContent).toBe('');

        expect(inputSpinButton).toBeVisible();
        expect(inputSpinButton).toHaveAttribute('type', 'number');
        expect(inputSpinButton).toHaveAttribute('value', '3');

        expect(inputTextBox).toBeVisible();
        expect(inputTextBox).toHaveAttribute('type', 'text');
        expect(inputTextBox).toHaveAttribute('value', 'none');

        expect(view.container).toMatchSnapshot();
    });

    it('should invoke onChange callback when first input was changed', () => {
        const onChangeMock = jest.fn();
        view = render(
            <ThemeTuner config={ThemeRollerTestConfig} cssVars={{}} onChange={onChangeMock} />
        );
        expect(view.container).toMatchSnapshot();

        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: '#00000',
            },
        });

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith({
            '--link-decoration-normal': '#00000',
        });
    });
});
