import { generateColorShades, mixTwoColors } from '../utils';
import type { CssVars } from '../OneUITheme';

export const colorVariables = {
    '--transparent': 'transparent',
    '--color-background': '#ffffff',
    '--color-foreground': '#2d3234',

    '--color-neutral': '#46494B',
    '--color-primary': '#0097d1',
    '--color-info': '#63dfec',
    '--color-light': '#D0D3D5',
    '--color-success': '#5cb85c',
    '--color-warning': '#ffb819',
    '--color-danger': '#f42534',
};

export const computedColorVariables = (baseVariables: CssVars): CssVars => {
    const generateColorShadesFromVariables = (name: string) =>
        generateColorShades(baseVariables, name);
    return {
        ...generateColorShadesFromVariables('--color-neutral'),
        ...generateColorShadesFromVariables('--color-primary'),
        ...generateColorShadesFromVariables('--color-light'),
        ...generateColorShadesFromVariables('--color-info'),
        ...generateColorShadesFromVariables('--color-success'),
        ...generateColorShadesFromVariables('--color-warning'),
        ...generateColorShadesFromVariables('--color-danger'),
        '--color-highlight-background': mixTwoColors(
            baseVariables['--color-primary'],
            baseVariables['--color-background'],
            90
        ),
        '--color-shadow-background': mixTwoColors(
            baseVariables['--color-foreground'],
            baseVariables['--color-background'],
            20
        ),
    };
};
