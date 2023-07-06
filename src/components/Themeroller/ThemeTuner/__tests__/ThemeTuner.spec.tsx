import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe('ThemeTuner component', () => {
    it.skip('should render component correctly', () => {
        const onChangeMock = jest.fn();
        const view = render(
            <ThemeTuner
                config={ThemeRollerTestConfig}
                cssVars={{
                    '--color-neutral': '#000000',
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

    it('should invoke onChange callback when first input was changed', async () => {
        const onChangeMock = jest.fn();
        const user = userEvent.setup();
        const view = render(
            <ThemeTuner
                config={ThemeRollerTestConfig}
                cssVars={{}}
                onChange={() => onChangeMock('#ffffff')}
            />
        );

        const itemsList = screen.getAllByRole('listitem');
        const inputFiled = itemsList[1].children[1].children[0] as HTMLElement;

        expect(view.container).toMatchSnapshot();
        expect(itemsList[1].children[0].textContent).toBe('Foreground color');
        expect(itemsList[1].children[1].textContent).toBe('#1d1d1b');

        await inputFiled.focus();
        await inputFiled.click();
        await user.click(inputFiled);
        await user.type(inputFiled, '#ffffff');

        // const spinButton = screen.getByRole('spinbutton');
        // const textBox = screen.getByRole('textbox');
        // const listItem = screen.getAllByRole('listitem');
        // const listBox = screen.getByRole('listbox');
        // const tab = screen.getByRole('tab', { name: 'Colors' });
        // const tabList = screen.getByRole('tablist');
        //
        // await user.click(spinButton);
        // await user.click(textBox);
        // await user.click(listItem[0]);
        // await user.click(listBox);
        // await user.click(tab);
        // await user.click(tabList);

        // wrapper
        //     .find('ul li input')
        //     .at(0)
        //     .simulate('change', {
        //         target: {
        //             value: '#00000',
        //         },
        //     });
        //
        const ch = screen.getAllByRole('log')[1];
        await ch.focus();
        // await ch.click();
        await user.click(ch);
        await user.type(ch, '#ffffff');
        // await user.selectOptions(ch, 'value: #f' );
        // await user.click(ch);
        expect(onChangeMock).toHaveBeenCalled();
        // expect(itemsList[1].children[1].textContent).toBe('#ffffff');
    });
});
