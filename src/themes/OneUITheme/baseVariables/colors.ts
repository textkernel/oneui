import { generateColorShades, mixTwoColors } from '../utils';
import type { CssVars } from '../OneUITheme';

export const colorVariables = {
    '--transparent': 'transparent',
    '--color-background': '#ffffff',
    '--color-foreground': '#2d3234',

    '--color-primary': '#0097d1',
    '--color-light': '#D0D3D5',

    '--color-neutral-0': '#ffffff',
    '--color-neutral-5': '#F3F3F3',
    '--color-neutral-10': '#E6E6E6',
    '--color-neutral-20': '#CCCCCC',
    '--color-neutral-30': '#B3B3B3',
    '--color-neutral-40': '#999999',
    '--color-neutral-50': '#808080',
    '--color-neutral-60': '#666666',
    '--color-neutral-70': '#4D4D4D',
    '--color-neutral-80': '#333333',
    '--color-neutral-90': '#1A1A1A',
    '--color-neutral-100': '#000000',
    '--color-neutral-100-20': 'rgba(0, 0, 0, 0.1254901961)',
    '--color-neutral-100-80': 'rgba(0, 0, 0, 0.5019607843)',

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

    '--color-success-10': '#EBF9EE',
    '--color-success-20': '#C2EECD',
    '--color-success-30': '#9AE3AC',
    '--color-success-40': '#71D88B',
    '--color-success-50': '#34C759',
    '--color-success-60': '#2A9F47',
    '--color-success-70': '#1F7735',
    '--color-success-80': '#155024',
    '--color-success-90': '#0A2812',

    '--color-cautious-10': '#FFFAE6',
    '--color-cautious-20': '#FFF0B3',
    '--color-cautious-30': '#FFE680',
    '--color-cautious-40': '#FFDB4D',
    '--color-cautious-50': '#FFCC01',
    '--color-cautious-60': '#CCA301',
    '--color-cautious-70': '#997A01',
    '--color-cautious-80': '#665200',
    '--color-cautious-90': '#332900',

    '--color-critical-10': '#FFEBEA',
    '--color-critical-20': '#FFC4C1',
    '--color-critical-30': '#FF9D97',
    '--color-critical-40': '#FF766D',
    '--color-critical-50': '#FF3B2F',
    '--color-critical-60': '#CC2F26',
    '--color-critical-70': '#99231C',
    '--color-critical-80': '#661813',
    '--color-critical-90': '#330C09',
};

export const computedColorVariables = (baseVariables: CssVars): CssVars => {
    const generateColorShadesFromVariables = (name: string) =>
        generateColorShades(baseVariables, name);
    return {
        ...generateColorShadesFromVariables('--color-primary'),
        ...generateColorShadesFromVariables('--color-light'),
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
