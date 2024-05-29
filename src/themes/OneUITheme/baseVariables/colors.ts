import { generateColorShades, mixTwoColors } from '../utils';
import type { CssVars } from '../OneUITheme';

export const colorVariables = {
    '--transparent': 'transparent',
    '--color-background': '#ffffff',
    '--color-foreground': '#2d3234',

    '--color-neutral': '#46494B',
    '--color-primary': '#0097d1',
    '--color-light': '#D0D3D5',
    '--color-success': '#5cb85c',
    '--color-warning': '#ffb819',
    '--color-danger': '#f42534',

    '--color-accent-10': '#FEE8D5',
    '--color-accent-20': '#FCD1AA',
    '--color-accent-30': '#FBBB80',
    '--color-accent-40': '#F9A455',
    '--color-accent-50': '#F88D2B',
    '--color-accent-60': '#C67122',
    '--color-accent-70': '#95551A',
    '--color-accent-80': '#633811',
    '--color-accent-90': '#321C09',

    '--color-ai-10': '#EEEEFB',
    '--color-ai-20': '#CDCCF3',
    '--color-ai-30': '#ACABEB',
    '--color-ai-40': '#8A89E2',
    '--color-ai-50': '#5856D6',
    '--color-ai-60': '#4645AB',
    '--color-ai-70': '#353480',
    '--color-ai-80': '#232256',
    '--color-ai-90': '#12112B',

    '--color-info-10': '#EEEEFB',
    '--color-info-20': '#B3D7FF',
    '--color-info-30': '#80BDFF',
    '--color-info-40': '#4DA2FF',
    '--color-info-50': '#007AFF',
    '--color-info-60': '#0062CC',
    '--color-info-70': '#004999',
    '--color-info-80': '#003166',
    '--color-info-90': '#001833',
};

export const computedColorVariables = (baseVariables: CssVars): CssVars => {
    const generateColorShadesFromVariables = (name: string) =>
        generateColorShades(baseVariables, name);
    return {
        ...generateColorShadesFromVariables('--color-neutral'),
        ...generateColorShadesFromVariables('--color-primary'),
        ...generateColorShadesFromVariables('--color-light'),
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
