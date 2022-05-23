import { ThemeGenerator, THEME_VERSION } from '../ThemeGenerator';

const mockSaveAs = jest.fn();
jest.mock('file-saver', () => ({
    saveAs(...args) {
        mockSaveAs(...args);
    },
}));
const mockDate = new Date('2022-01-01');
const RealDate = Date;
global.Date = class extends RealDate {
    constructor() {
        super();
        return mockDate;
    }
};

describe('ThemeGenerator', () => {
    const cssVariables = {
        '--transparent': 'transparent',
        '--color-brand': 'blue',
        '--color-brand-10': '#101010',
        '--color-brand-20': '#202020',
        '--color-brand-30': '#303030',
    };
    const jsonTheme = {
        name: 'dark-theme',
        version: THEME_VERSION,
        created: '2022-01-01T00:00:00.000Z',
        theme: {
            cssVariables,
        },
    };
    const OneUITheme = (props) => ({
        ...cssVariables,
        ...props,
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        global.Date = RealDate;
    });

    describe('#saveAsJson()', () => {
        it('should pass correct arguments to save function', () => {
            ThemeGenerator.saveAsJson('--color-brand: blue', 'dark-theme');
            /* eslint-disable no-undef */
            expect(mockSaveAs).toBeCalledWith(new Blob(), 'dark-theme.json');
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

    describe('#getStylesFrom()', () => {
        it('should return styles from JSON theme', () => {
            const styles = ThemeGenerator.getStylesFromTheme(jsonTheme);
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

    describe('#createTheme()', () => {
        it('should convert CSS variables into theme', () => {
            const theme = ThemeGenerator.createTheme('dark-theme', cssVariables);
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

    describe('#generateTheme()', () => {
        it('should return empty theme with mete', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            expect(themeGenerator.generateTheme('dark-theme')).toEqual({
                name: 'dark-theme',
                version: THEME_VERSION,
                created: '2022-01-01T00:00:00.000Z',
                theme: {
                    cssVariables: {},
                },
            });
        });
        it('should generate JSON theme with changes', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            const customProperties = {
                '--transparent': 'none',
                '--color-brand': 'red',
            };
            expect(themeGenerator.generateTheme('dark-theme', customProperties)).toEqual({
                name: 'dark-theme',
                version: THEME_VERSION,
                created: '2022-01-01T00:00:00.000Z',
                theme: {
                    cssVariables: {
                        '--transparent': 'none',
                        '--color-brand': 'red',
                    },
                },
            });
        });
    });
});
