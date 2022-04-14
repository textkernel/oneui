import type { ThemeGenerator } from '../ThemeGenerator';

type ThemeRollerConfigFieldset = {
    fieldsetName: string;
    items: ThemeRollerConfigItem[];
};

type ThemeRollerConfigItem = {
    label: string;
    type: string;
    var: string;
    value: string;
    units?: string;
};

type Deps = {
    themeGenerator: ThemeGenerator;
};

export class ThemeRollerReactComponent {
    private config: ThemeRollerConfigFieldset[];

    private deps: Deps;

    constructor(config: ThemeRollerConfigFieldset[], deps: Deps) {
        this.config = config;
        this.deps = deps;
    }

    private getVariables() {
        // the following list of variables is a result of the form filled in by user.
        // The form is generated based on `this.config`;
        const result: Record<string, string> = {}
        this.config.forEach(fieldset => {
            fieldset.items.forEach(item => {
                result[item.var] = `${item.value}${item.units || ''}`
            });
        })
        return result;
    }

    public getTheme() {
        const baseCustomVariables = this.getVariables();
        return this.deps.themeGenerator.generate(baseCustomVariables);
    }
}
