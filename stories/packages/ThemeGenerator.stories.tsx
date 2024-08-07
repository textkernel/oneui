import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { OneUITheme, ThemeGenerator, CssVars } from '@textkernel/oneui';

const meta: Meta<CssVars> = {
    title: 'packages/ThemeGenerator',
    argTypes: {
        '--color-neutral': { control: 'color' },
        '--color-primary': { control: 'color' },
        '--color-info': { control: 'color' },
        '--color-success': { control: 'color' },
        '--color-cautious': { control: 'color' },
        '--color-critical': { control: 'color' },
        '--font-size-base': { control: 'text' },
    },
};

export default meta;

type Story = StoryObj<CssVars>;

export const _ThemeGenerator: Story = {
    name: 'ThemeGenerator',
    args: {
        '--color-background': '#ffffff',
        '--color-neutral': '#4d4d4d',
        '--color-primary': '#0097d1',
        '--color-info': '#007AFF',
        '--color-success': '#34C759',
        '--color-cautious': '#FFCC01',
        '--color-critical': '#f42534',
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
