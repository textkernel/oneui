/**
 * @module ThemeGenerator
 */

type CSSVars = {
    [key: string]: string;
};

type Theme = (cssVars: CSSVars) => CSSVars;

export class ThemeGenerator {
    private theme: Theme;

    constructor(theme: Theme) {
        this.theme = theme;
    }

    public generate(CSSVariables: CSSVars = {}): string {
        return Object.entries(this.theme(CSSVariables)).reduce((result, [variableName, variableValue]) => {
            return `${result}
                ${[variableName]}: ${[variableValue]};
            `;
            },
            ''
        );
    }
}
