import { ThemeGenerator } from '../ThemeGenerator';
import { THEME_CONFIG_VERSION } from '../ThemeResult';

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
        '--color-primary': 'blue',
        '--color-primary-10': '#101010',
        '--color-primary-20': '#202020',
        '--color-primary-30': '#303030',
    };
    const jsonTheme = {
        name: 'dark-theme',
        created: '2022-12-12T00:00:00.000Z',
        configVersion: THEME_CONFIG_VERSION,
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

    describe('#constructor()', () => {
        it('should create correct empty theme result', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            expect(themeGenerator.result.name).toEqual('');
            expect(themeGenerator.result.fileName).toEqual('');
            expect(themeGenerator.result.created).toEqual('2022-01-01T00:00:00.000Z');
            expect(themeGenerator.result.configVersion).toEqual(THEME_CONFIG_VERSION);
            expect(themeGenerator.result.theme).toEqual({
                cssVariables: {},
            });
        });
    });

    describe('#setTheme()', () => {
        it('should set theme with styles', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            const cssVars = {
                '--color-primary': 'red',
                '--color-primary-10': '#111111',
                '--color-primary-20': '#222222',
                '--color-primary-30': '#333333',
            };
            themeGenerator.setTheme('dark-theme', cssVars);
            expect(themeGenerator.result.name).toEqual('dark-theme');
            expect(themeGenerator.result.fileName).toEqual('dark-theme.theme.json');
            expect(themeGenerator.result.created).toEqual('2022-01-01T00:00:00.000Z');
            expect(themeGenerator.result.configVersion).toEqual(THEME_CONFIG_VERSION);
            expect(themeGenerator.result.theme).toEqual({
                cssVariables: cssVars,
            });
        });
    });

    describe('#replaceTheme()', () => {
        it('should create theme from JSON theme result', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            themeGenerator.replaceTheme(jsonTheme);
            expect(themeGenerator.result.name).toEqual('dark-theme');
            expect(themeGenerator.result.fileName).toEqual('dark-theme.theme.json');
            expect(themeGenerator.result.created).toEqual('2022-12-12T00:00:00.000Z');
            expect(themeGenerator.result.configVersion).toEqual(THEME_CONFIG_VERSION);
            expect(themeGenerator.result.theme).toEqual({
                cssVariables,
            });
        });
    });

    describe('#saveAsJson()', () => {
        it('should pass correct arguments to save function', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            const cssVars = {
                '--color-primary': 'red',
            };
            themeGenerator.setTheme('dark-theme', cssVars);
            themeGenerator.saveAsJson();
            /* eslint-disable no-undef */
            expect(mockSaveAs).toBeCalledWith(new Blob(), 'dark-theme.theme.json');
        });
    });

    describe('#getStyles()', () => {
        it('should return theme CSS styles', () => {
            const themeGenerator = new ThemeGenerator(OneUITheme);
            const cssVars = {
                '--color-primary': 'red',
            };
            themeGenerator.setTheme('dark-theme', cssVars);
            expect(themeGenerator.getStyles().replace(/\s+/g, '')).toEqual(
                ':root{--color-primary:red;};'
            );
        });
    });
});
