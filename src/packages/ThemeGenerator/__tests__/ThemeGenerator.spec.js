import { ThemeGenerator } from '../ThemeGenerator';

const mockSaveAs = jest.fn();
jest.mock('file-saver', () => ({
    saveAs(...args) {
        mockSaveAs(...args);
    },
}));

describe('ThemeGenerator', () => {
    const cssVariables = {
        '--transparent': 'transparent',
        '--color-brand': 'blue',
        '--color-brand-10': '#101010',
        '--color-brand-20': '#202020',
        '--color-brand-30': '#303030',
    };
    const jsonTheme = { cssVariables };
    const OneUITheme = (props) => ({
        ...cssVariables,
        ...props,
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('#saveAsJson()', () => {
        it('should pass correct arguments to save function', () => {
            ThemeGenerator.saveAsJson('--color-brand: blue');
            /* eslint-disable no-undef */
            expect(mockSaveAs).toBeCalledWith(new Blob(), 'theme.json');
        });
    });

    describe('#generateCss()', () => {
        it('should return list of style attributes', () => {
            const styles = ThemeGenerator.generateCss(cssVariables);
            expect(styles.replace(/\s+/g, '')).toEqual(
                '--transparent:transparent;--color-brand:blue;--color-brand-10:#101010;--color-brand-20:#202020;--color-brand-30:#303030;'
            );
        });
    });

    describe('#generateStylesFromThemeJSON()', () => {
        it('should return styles from JSON theme', () => {
            const styles = ThemeGenerator.generateStylesFromThemeJSON(jsonTheme);
            expect(styles.replace(/\s+/g, '')).toEqual(
                ':root{--transparent:transparent;--color-brand:blue;--color-brand-10:#101010;--color-brand-20:#202020;--color-brand-30:#303030;};'
            );
        });
    });

    describe('#generateStylesFromThemeJSON()', () => {
        it('should return styles from JSON theme', () => {
            const styles = ThemeGenerator.generateStylesFromThemeJSON(jsonTheme);
            expect(styles.replace(/\s+/g, '')).toEqual(
                ':root{--transparent:transparent;--color-brand:blue;--color-brand-10:#101010;--color-brand-20:#202020;--color-brand-30:#303030;};'
            );
        });
    });

    describe('#wrapInCssRoot()', () => {
        it('should wrap into root CSS pseudo-class', () => {
            const styles = ThemeGenerator.wrapInCssRoot('--color-brand: blue');
            expect(styles.replace(/\s+/g, '')).toEqual(':root{--color-brand:blue};');
        });
    });

    describe('#wrapInJSON()', () => {
        it('should convert CSS variables into JSON theme', () => {
            const theme = ThemeGenerator.wrapInJSON(cssVariables);
            expect(theme).toEqual(jsonTheme);
        });
    });

    describe('#generateThemeCss()', () => {
        it('should generate default CSS theme properties', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            expect(themeGenerator.generateThemeCss().replace(/\s+/g, '')).toEqual(
                '--transparent:transparent;--color-brand:blue;--color-brand-10:#101010;--color-brand-20:#202020;--color-brand-30:#303030;'
            );
        });
        it('should generate custom CSS theme properties', () => {
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

    describe('#generateJSONDiff()', () => {
        it('should return empty JSON theme', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            expect(themeGenerator.generateJSONDiff()).toEqual({ cssVariables: {} });
        });
        it('should generate JSON theme with changes', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            const customProperties = {
                '--transparent': 'none',
                '--color-brand': 'red',
            };
            expect(themeGenerator.generateJSONDiff(customProperties)).toEqual({
                cssVariables: {
                    '--transparent': 'none',
                    '--color-brand': 'red',
                },
            });
        });
    });
});
