/**
 * @module ThemeGenerator is responsible for generating
 * custom CSS properties from theme variables.
 */
import FileSaver from 'file-saver';
import { ThemeType } from '../../themes/OneUITheme';

type CssVars = {
    [key: string]: string;
};

export type ThemeJsonResult = {
    cssVariables: CssVars;
};

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

    public static generateStylesFromThemeJSON(jsonResult: ThemeJsonResult): string {
        const { cssVariables } = jsonResult;
        return ThemeGenerator.wrapInCssRoot(ThemeGenerator.generateCss(cssVariables));
    }

    public static wrapInCssRoot(styles: string): string {
        return `:root {\n\t${styles}\n};`;
    }

    public static wrapInJSON(cssVars: CssVars = {}): ThemeJsonResult {
        return {
            cssVariables: cssVars,
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

    public generateJSONDiff(cssVars: CssVars = {}): ThemeJsonResult {
        const diffCssVars = this.getDiff(cssVars);
        return ThemeGenerator.wrapInJSON(diffCssVars);
    }
}
