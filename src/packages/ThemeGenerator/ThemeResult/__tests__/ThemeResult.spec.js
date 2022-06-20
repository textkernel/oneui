import { ThemeResult, THEME_CONFIG_VERSION } from '../ThemeResult';

const mockDate = new Date('2022-01-01');
const RealDate = Date;
global.Date = class extends RealDate {
    constructor() {
        super();
        return mockDate;
    }
};

describe('ThemeResult', () => {
    const cssVariables = {
        '--transparent': 'transparent',
        '--color-brand': 'blue',
        '--color-brand-10': '#101010',
        '--color-brand-20': '#202020',
        '--color-brand-30': '#303030',
    };
    const jsonTheme = {
        name: 'dark-theme',
        created: '2022-12-12T00:00:00.000Z',
        configVersion: THEME_CONFIG_VERSION,
        theme: {
            cssVariables,
        },
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        global.Date = RealDate;
    });

    describe('#constructor()', () => {
        it('should create correct theme result', () => {
            const theme = new ThemeResult(jsonTheme);
            expect(theme.name).toEqual('dark-theme');
            expect(theme.fileName).toEqual('dark-theme.theme.json');
            expect(theme.created).toEqual('2022-12-12T00:00:00.000Z');
            expect(theme.configVersion).toEqual(THEME_CONFIG_VERSION);
            expect(theme.theme).toEqual({
                cssVariables,
            });
            expect(theme.toJSON()).toEqual({
                name: 'dark-theme',
                created: '2022-12-12T00:00:00.000Z',
                configVersion: THEME_CONFIG_VERSION,
                theme: {
                    cssVariables,
                },
            });
        });
    });

    describe('#create()', () => {
        it('should create correct theme result', () => {
            const theme = ThemeResult.create('dark-theme', cssVariables);
            expect(theme.name).toEqual('dark-theme');
            expect(theme.fileName).toEqual('dark-theme.theme.json');
            expect(theme.created).toEqual('2022-01-01T00:00:00.000Z');
            expect(theme.configVersion).toEqual(THEME_CONFIG_VERSION);
            expect(theme.theme).toEqual({
                cssVariables,
            });
            expect(theme.toJSON()).toEqual({
                name: 'dark-theme',
                created: '2022-01-01T00:00:00.000Z',
                configVersion: THEME_CONFIG_VERSION,
                theme: {
                    cssVariables,
                },
            });
        });
    });

    describe('validation', () => {
        it('should throw error when name is incorrect', () => {
            jsonTheme.name = null;
            expect(() => new ThemeResult(jsonTheme)).toThrow();
        });
        it('should throw error when created is incorrect', () => {
            jsonTheme.date = 'incorrect date';
            expect(() => new ThemeResult(jsonTheme)).toThrow();
        });
        it('should throw error when configVersion is incorrect', () => {
            jsonTheme.configVersion = (THEME_CONFIG_VERSION + 1).toString();
            expect(() => new ThemeResult(jsonTheme)).toThrow();
        });
        it('should throw error when theme is incorrect', () => {
            jsonTheme.theme = {
                cssVariables: {
                    incorrectVarible: '#fffff',
                },
            };
            expect(() => new ThemeResult(jsonTheme)).toThrow();
        });
        it('should throw error when name is missed', () => {
            const wrongJsonTheme = {
                ...jsonTheme,
            };
            delete wrongJsonTheme.name;
            expect(() => new ThemeResult(jsonTheme)).toThrow();
        });
        it('should throw error when theme is missed', () => {
            const wrongJsonTheme = {
                ...jsonTheme,
            };
            delete wrongJsonTheme.theme;
            expect(() => new ThemeResult(jsonTheme)).toThrow();
        });
        it('should throw error when theme has additional fields', () => {
            const wrongJsonTheme = {
                ...jsonTheme,
                newField: 'some value',
            };
            expect(() => new ThemeResult(wrongJsonTheme)).toThrow();
        });
    });
});
