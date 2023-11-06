import Color from 'color';
import type { CssVars } from './OneUITheme';

export const mixTwoColors = (firstColor: string, secondColor, weight: number): string =>
    Color(Color(firstColor).mix(Color(secondColor), weight / 100)).hex();

export const generateColorShades = (variables: CssVars, name: string): CssVars => {
    const FACTORS = [20, 50, 80];
    return FACTORS.reduce(
        (result, factor) => ({
            ...result,
            [`${name}-${50 - Math.round(factor / 2)}`]: mixTwoColors(
                variables[name],
                variables['--color-background'],
                factor
            ),
            [`${name}-${50 + Math.round(factor / 2)}`]: mixTwoColors(
                variables[name],
                variables['--color-foreground'],
                factor
            ),
        }),
        {}
    );
};
