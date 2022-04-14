export class ThemeGenerator {
    private theme: any;

    constructor(theme: any) {
        this.theme = theme;
    }

    public generate(baseVariables: Record<string, string>) {
        return this.theme(baseVariables);
    }
}
