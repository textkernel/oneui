/**
 * @module ThemeGenerator is responsible for generating
 * custom CSS properties from theme variables.
 */
import FileSaver from 'file-saver';
import { ThemeType } from '../../themes/OneUITheme';

type CssVars = {
    [key: string]: string;
};

type ThemeInfo = {
    name: string;
    created: string;
    version: string;
};

export interface ThemeJsonResult extends ThemeInfo {
    theme: {
        cssVariables: CssVars;
    };
}

export const THEME_VERSION = '1';

export class ThemeGenerator {
    private theme: ThemeType;

    public static saveAsJson(styles: string, fileName = 'theme') {
        const blob = new Blob([styles], {
            type: 'application/json;charset=utf-8',
        });
        FileSaver.saveAs(blob, `${fileName}.json`);
    }

    public static generateCss(cssVars: CssVars = {}): string {
        return Object.entries(cssVars).reduce((result, [varName, varValue]) => {
            return `${result}${[varName]}: ${[varValue]};\n\t`;
        }, '');
    }

    public static getStylesFromTheme(jsonResult: ThemeJsonResult): string {
        const {
            theme: { cssVariables },
        } = jsonResult;
        return ThemeGenerator.wrapInCssRoot(ThemeGenerator.generateCss(cssVariables));
    }

    public static wrapInCssRoot(styles: string): string {
        return `:root {\n\t${styles}\n};`;
    }

    public static createTheme(name: string, cssVars: CssVars = {}): ThemeJsonResult {
        return {
            name,
            version: THEME_VERSION,
            created: new Date().toISOString(),
            theme: {
                cssVariables: cssVars,
            },
        };
    }

    constructor(theme: ThemeType) {
        this.theme = theme;
    }

    private getDiff(cssVars: CssVars = {}): CssVars {
        const theme = this.theme();
        const varsList = Object.entries(this.theme(cssVars));

        return varsList
            .filter(([key, value]) => theme[key] !== value)
            .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
    }

    public generateThemeCss(cssVars: CssVars = {}): string {
        return ThemeGenerator.generateCss(this.theme(cssVars));
    }

    public generateTheme(name: string, cssVars: CssVars = {}): ThemeJsonResult {
        const diffCssVars = this.getDiff(cssVars);
        return ThemeGenerator.createTheme(name, diffCssVars);
    }
}
