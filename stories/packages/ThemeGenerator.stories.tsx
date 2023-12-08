import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OneUITheme, ThemeGenerator, CssVars } from '@textkernel/oneui';

const meta: Meta<CssVars> = {
    title: 'packages/ThemeGenerator',
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

export default meta;

type Story = StoryObj<CssVars>;

export const _ThemeGenerator: Story = {
    name: 'ThemeGenerator',
    args: {
        '--color-background': '#ffffff',
        '--color-neutral': '#1d1d1b',
        '--color-primary': '#0097d1',
        '--color-light': '#78797c',
        '--color-info': '#63dfec',
        '--color-success': '#5cb85c',
        '--color-warning': '#ffb819',
        '--color-danger': '#f42534',
        '--font-size-base': '14px',
    },
    parameters: {
        controls: { disable: true },
    },
    render: (args) => {
        const themeGenerator = new ThemeGenerator(OneUITheme);
        themeGenerator.setTheme('dark', args);
        const oneUICssVariables = themeGenerator.getStyles();

        return (
            <div>
                <pre>{oneUICssVariables}</pre>
            </div>
        );
    },
};
