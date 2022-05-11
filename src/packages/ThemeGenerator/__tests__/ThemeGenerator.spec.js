import { ThemeGenerator } from '../ThemeGenerator';

describe('ThemeGenerator', () => {
    describe('#generate()', () => {
        it('should generate default theme CSS properties', () => {
            const OneUITheme = () => ({
                '--transparent': 'transparent',
                '--color-brand': 'blue',
                '--color-brand-10': '#101010',
                '--color-brand-20': '#202020',
                '--color-brand-30': '#303030',
            });
            const themeGenerator = new ThemeGenerator(OneUITheme);
            expect(themeGenerator.generateThemeCss().replace(/\s+/g, '')).toEqual(
                '--transparent:transparent;--color-brand:blue;--color-brand-10:#101010;--color-brand-20:#202020;--color-brand-30:#303030;'
            );
        });
        it('should generate custom theme CSS properties', () => {
            const OneUITheme = (props) => ({
                '--transparent': 'transparent',
                '--color-brand': 'blue',
                '--color-brand-10': '#101010',
                '--color-brand-20': '#202020',
                '--color-brand-30': '#303030',
                ...props,
            });
            const themeGenerator = new ThemeGenerator(OneUITheme);
            const customProperties = {
                '--transparent': 'none',
                '--color-brand': 'red',
            };
            expect(themeGenerator.generateThemeCss(customProperties).replace(/\s+/g, '')).toEqual(
                '--transparent:none;--color-brand:red;--color-brand-10:#101010;--color-brand-20:#202020;--color-brand-30:#303030;'
            );
        });
    });
});
