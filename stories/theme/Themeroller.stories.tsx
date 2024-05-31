import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Themeroller } from '@textkernel/oneui';
// import OneUI, { Themeroller, THEMEROLLER_CONFIG } from '@textkernel/oneui';

const meta: Meta<typeof Themeroller> = {
    title: 'Theme/Themeroller',
    component: Themeroller,
};

export default meta;

type Story = StoryObj<typeof Themeroller>;

// const handleChange = (themeResult) => {
//     sessionStorage.setItem(OneUI.THEME_ELEMENT_ID, JSON.stringify(themeResult));
// };

export const ThemeBuilder: Story = {
    name: 'Theme builder',
    // args: {
    //     inputLabel: 'Theme name',
    //     resetLabel: 'Reset to defaults',
    //     fileLabel: 'Import file',
    //     downloadLabel: 'Download',
    //     downloadTooltipLabel: 'Please specify the Theme name',
    //     config: THEMEROLLER_CONFIG,
    //     onChange: handleChange,
    // },
    // render: (args) => {
    //     let activeTheme;
    //     let hasActiveTheme;
    //     try {
    //         activeTheme = JSON.parse(sessionStorage.getItem(OneUI.THEME_ELEMENT_ID) || '' || '');
    //         hasActiveTheme = Object.keys(activeTheme.theme.cssVariables).length;
    //     } catch (err) {
    //         console.error(err);
    //     }
    //     return (
    //         <Themeroller
    //             {...args}
    //             resetActiveLabel={hasActiveTheme ? 'Revert to active theme' : undefined}
    //             activeTheme={activeTheme}
    //         />
    //     );
    // },
    render: () => (
        <div>
            <p>
                After{' '}
                <a href="https://textkernel.atlassian.net/browse/ONEUI-439">
                    refactoring primitive css variables
                </a>
                , this component needs to be revisited. In the meantime the UI has been disabled as
                a temporary measure to prevent confusion.
            </p>
        </div>
    ),
};
