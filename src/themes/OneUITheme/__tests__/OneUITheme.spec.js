import { OneUITheme } from '../OneUITheme';

jest.mock('../baseVariables', () => ({
    colorVariables: {
        '--transparent': 'transparent',
        '--color-brand': 'blue',
    },
    computedColorVariables: () => ({
        '--color-brand-10': '#101010',
        '--color-brand-20': '#202020',
        '--color-brand-30': '#303030',
    }),
}));

describe('OneUITheme', () => {
    it('should return default CSS properties', () => {
        const oneUITheme = OneUITheme();
        expect(oneUITheme).toEqual({
            '--transparent': 'transparent',
            '--color-brand': 'blue',
            '--color-brand-10': '#101010',
            '--color-brand-20': '#202020',
            '--color-brand-30': '#303030',
        });
    });
    it('should return custom CSS properties', () => {
        const oneUITheme = OneUITheme({
            '--transparent': 'none',
            '--color-brand': 'red',
        });
        expect(oneUITheme).toEqual({
            '--transparent': 'none',
            '--color-brand': 'red',
            '--color-brand-10': '#101010',
            '--color-brand-20': '#202020',
            '--color-brand-30': '#303030',
        });
    });
});
