import * as React from 'react';
import { OneUITheme, ThemeGenerator } from '@textkernel/oneui';

export default {
    title: 'packages/ThemeGenerator',
    component: ThemeGenerator,
    argTypes: {
        '--color-brand': { control: 'color' },
        '--color-neutral': { control: 'color' },
        '--color-muted': { control: 'color' },
        '--color-info': { control: 'color' },
        '--color-accent': { control: 'color' },
        '--color-good': { control: 'color' },
        '--color-warning': { control: 'color' },
        '--color-bad': { control: 'color' },
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
    '--color-brand': '#fff',
    '--color-neutral': '#d0d1d5',
    '--color-muted': '#b3b2b2',
    '--color-info': '#60c4de',
    '--color-accent': '#182642',
    '--color-good': '#5cb85c',
    '--color-warning': '#ffb819',
    '--color-bad': '#f42534',
    '--font-size-base': '14px',
};
