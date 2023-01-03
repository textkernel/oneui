import { generateColorShades, mixTwoColors } from '../utils';
import type { CssVars } from '../OneUITheme';

export const colorVariables = {
    '--transparent': 'transparent',
    '--color-background': '#ffffff',
    '--color-foreground': '#1d1d1b',

    '--color-neutral': '#707070',
    '--color-primary': '#0097d1',
    '--color-info': '#63dfec',
    '--color-light': '#DBDBDB',
    '--color-success': '#5cb85c',
    '--color-warning': '#ffb819',
    '--color-danger': '#f42534',

    '--color-bright-1': '#142459',
    '--color-bright-2': '#507D9B',
    '--color-bright-3': '#F6C85F',
    '--color-bright-4': '#6F4D7C',
    '--color-bright-5': '#9CD766',
    '--color-bright-6': '#CA472F',
    '--color-bright-7': '#820401',
    '--color-bright-8': '#EE9A3A',
    '--color-bright-9': '#E7E34E',
    '--color-bright-10': '#D9DADD',

    '--color-muted-1': '#AFF5E2',
    '--color-muted-2': '#D6F481',
    '--color-muted-3': '#FFF16B',
    '--color-muted-4': '#FFD571',
    '--color-muted-5': '#FFC4A6',
    '--color-muted-6': '#E5DAC9',
    '--color-muted-7': '#ECCBFF',
    '--color-muted-8': '#FFC5EB',
    '--color-muted-9': '#FCC1CF',
    '--color-muted-10': '#C4D7FC',
    '--color-muted-11': '#ADDDFF',
    '--color-muted-12': '#75DFFB',
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
