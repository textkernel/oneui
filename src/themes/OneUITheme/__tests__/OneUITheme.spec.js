import { OneUITheme } from '../OneUITheme';

jest.mock('../baseVariables', () => ({
    colorVariables: {
        '--transparent': 'transparent',
        '--color-primary': 'blue',
    },
    computedColorVariables: () => ({
        '--color-primary-10': '#101010',
        '--color-primary-20': '#202020',
        '--color-primary-30': '#303030',
    }),
}));

describe('OneUITheme', () => {
    it('should return default CSS properties', () => {
        const oneUITheme = OneUITheme();
        expect(oneUITheme).toEqual({
            '--transparent': 'transparent',
            '--color-primary': 'blue',
            '--color-primary-10': '#101010',
            '--color-primary-20': '#202020',
            '--color-primary-30': '#303030',
        });
    });
    it('should return custom CSS properties', () => {
        const oneUITheme = OneUITheme({
            '--transparent': 'none',
            '--color-primary': 'red',
        });
        expect(oneUITheme).toEqual({
            '--transparent': 'none',
            '--color-primary': 'red',
            '--color-primary-10': '#101010',
            '--color-primary-20': '#202020',
            '--color-primary-30': '#303030',
        });
    });
});
