import { mixTwoColors, generateColorShades } from '../utils';
import type { CssVars } from '../OneUITheme';

export const colorVariables = {
    '--transparent': 'transparent',
    '--color-background': '#ffffff',
    '--color-foreground': '#1d1d1b',
    '--color-neutral': '#d0d1d5',
    '--color-muted': '#b3b2b2',
    '--color-primary': '#0097d1',
    '--color-secondary': '#182642',
    '--color-good': '#5cb85c',
    '--color-warning': '#ffb819',
    '--color-bad': '#f42534',
    '--link-color-normal': 'var(--color-primary)',
    '--link-color-hover': 'var(--color-primary-40)',
    '--border-color-light': 'var(--color-neutral-25)',
    '--border-color-strong': 'var(--color-neutral-40)',
};

export const computedColorVariables = (baseVariables: CssVars): CssVars => {
    const generateColorShadesFromVariables = (name: string) =>
        generateColorShades(baseVariables, name);
    return {
        ...generateColorShadesFromVariables('--color-neutral'),
        ...generateColorShadesFromVariables('--color-muted'),
        ...generateColorShadesFromVariables('--color-primary'),
        ...generateColorShadesFromVariables('--color-secondary'),
        ...generateColorShadesFromVariables('--color-good'),
        ...generateColorShadesFromVariables('--color-warning'),
        ...generateColorShadesFromVariables('--color-bad'),
        '--color-highlight-background': mixTwoColors(
            baseVariables['--color-primary'],
            baseVariables['--color-background'],
            90
        ),
        '--color-selection-background': mixTwoColors(
            baseVariables['--color-primary'],
            baseVariables['--color-background'],
            90
        ),
        '--color-shadow-background': mixTwoColors(
            baseVariables['--color-foreground'],
            baseVariables['--color-background'],
            50
        ),
    };
};
