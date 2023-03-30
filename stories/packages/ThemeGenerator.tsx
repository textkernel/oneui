import * as React from 'react';
import { OneUITheme, ThemeGenerator } from '@textkernel/oneui';

export default {
    title: 'packages/ThemeGenerator',
    component: ThemeGenerator,
    argTypes: {
        '--color-neutral': { control: 'color' },
        '--color-primary': { control: 'color' },
        '--color-light': { control: 'color' },
        '--color-info': { control: 'color' },
        '--color-success': { control: 'color' },
        '--color-warning': { control: 'color' },
        '--color-danger': { control: 'color' },
        '--font-size-base': { control: 'text' },
    },
};

export const _ThemeGenerator = (args) => {
    const themeGenerator = new ThemeGenerator(OneUITheme);
    themeGenerator.setTheme('dark', args);
    const oneUICssVariables = themeGenerator.getStyles();

    return (
        <div>
            <pre>{oneUICssVariables}</pre>
        </div>
    );
};
_ThemeGenerator.args = {
    '--color-background': '#ffffff',
    '--color-neutral': '#1d1d1b',
    '--color-primary': '#0097d1',
    '--color-light': '#78797c',
    '--color-info': '#63dfec',
    '--color-success': '#5cb85c',
    '--color-warning': '#ffb819',
    '--color-danger': '#f42534',
    '--font-size-base': '14px',
};
