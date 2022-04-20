import { mixTwoColors, generateColorShades } from '../utils';
import type { CSSVars } from '../OneUITheme';

export const colorVariables = {
    '--transparent': 'transparent',
    '--color-background': '#ffffff',
    '--color-foreground': '#1d1d1b',
    '--color-neutral': '#d0d1d5',
    '--color-muted': '#b3b2b2',
    '--color-brand': '#0097d1',
    '--color-accent': '#182642',
    '--color-info': '#60c4de',
    '--color-good': '#5cb85c',
    '--color-warning': '#ffb819',
    '--color-bad': '#f42534',
    '--link-color-normal': 'var(--color-brand)',
    '--link-color-hover': 'var(--color-brand-40)',
    '--border-color-light': 'var(--color-neutral-25)',
    '--border-color-strong': 'var(--color-neutral-40)',
};

export const computedColorVariables = (baseVariables: CSSVars): CSSVars => {
    const generateColorShadesFromVariables = (name: string) => generateColorShades(baseVariables, name);
    return {
        ...generateColorShadesFromVariables('--color-neutral'),
        ...generateColorShadesFromVariables('--color-muted'),
        ...generateColorShadesFromVariables('--color-brand'),
        ...generateColorShadesFromVariables('--color-accent'),
        ...generateColorShadesFromVariables('--color-info'),
        ...generateColorShadesFromVariables('--color-good'),
        ...generateColorShadesFromVariables('--color-warning'),
        ...generateColorShadesFromVariables('--color-bad'),
        '--color-highlight-background': mixTwoColors(
            baseVariables['--color-brand'],
            baseVariables['--color-background'],
            0.9
        ),
        '--color-selection-background': mixTwoColors(
            baseVariables['--color-brand'],
            baseVariables['--color-background'],
            0.9
        ),
    };
};
