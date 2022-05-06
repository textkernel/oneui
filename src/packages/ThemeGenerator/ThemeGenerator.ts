/**
 * @module ThemeGenerator is responsible for generating
 * custom CSS properties from theme variables.
 */
import FileSaver from 'file-saver';

type CSSVars = {
    [key: string]: string;
};

type Theme = (cssVars?: CSSVars) => CSSVars;

export class ThemeGenerator {
    private theme: Theme;

    constructor(theme: Theme) {
        this.theme = theme;
    }

    private getDiff(cssVars: CSSVars = {}): CSSVars {
        const theme = this.theme();
        const varsList = Object.entries(this.theme(cssVars));

        return varsList
            .filter(([key, value]) => theme[key] !== value)
            .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
    }

    public generate(cssVars: CSSVars = {}): string {
        return Object.entries(this.theme(cssVars)).reduce((result, [varName, varValue]) => {
            return `${result}
                ${[varName]}: ${[varValue]};
            `;
        }, '');
    }

    public generateDiff(cssVars: CSSVars = {}): string {
        const diffCssVars = this.getDiff(cssVars);
        return Object.entries(diffCssVars).reduce((result, [varName, varValue]) => {
            return `${result}${[varName]}: ${[varValue]};\n\t`;
        }, '');
    }

    public static saveAsCss(styles: string, fileName = 'styles') {
        const blob = new Blob([ThemeGenerator.wrapInRoot(styles)], {
            type: 'text/css;charset=utf-8',
        });
        FileSaver.saveAs(blob, `${fileName}.css`);
    }

    public static wrapInRoot(styles: string): string {
        return `:root {\n\t${styles}\n};`;
    }
}
