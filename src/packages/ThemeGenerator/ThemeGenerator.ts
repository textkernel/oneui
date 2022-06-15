/**
 * @module ThemeGenerator is responsible for generating theme
 */
import FileSaver from 'file-saver';
import { ThemeType } from '../../themes/OneUITheme';
import { ThemeResult } from './ThemeResult';

type CssVars = {
    [key: string]: string;
};

export class ThemeGenerator {
    private theme: ThemeType;

    public result: ThemeResult;

    public static generateCss(cssVars: CssVars = {}): string {
        return Object.entries(cssVars).reduce((result, [varName, varValue]) => {
            return `${result}${[varName]}: ${[varValue]};\n\t`;
        }, '');
    }

    public static wrapInCssRoot(styles: string): string {
        return `:root {\n\t${styles}\n};`;
    }

    constructor(theme: ThemeType) {
        this.theme = theme;
        this.result = ThemeResult.create('', {});
    }

    private getDiff(cssVars: CssVars = {}): CssVars {
        const theme = this.theme();
        const varsList = Object.entries(this.theme(cssVars));

        return varsList
            .filter(([key, value]) => theme[key] !== value)
            .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
    }

    public setTheme(name: string, cssVars: CssVars) {
        const diffCssVars = this.getDiff(cssVars);
        this.result = ThemeResult.create(name, diffCssVars);
    }

    public replaceTheme(jsonResult: unknown) {
        this.result = new ThemeResult(jsonResult);
    }

    public getStyles(): string {
        const {
            theme: { cssVariables },
        } = this.result;
        return ThemeGenerator.wrapInCssRoot(ThemeGenerator.generateCss(cssVariables));
    }

    public saveAsJson() {
        const themeAsString = JSON.stringify(this.result.toJSON(), undefined, 2);
        const blob = new Blob([themeAsString], {
            type: 'application/json;charset=utf-8',
        });
        FileSaver.saveAs(blob, this.result.fileName);
    }
}
