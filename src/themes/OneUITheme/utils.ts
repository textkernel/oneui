import Color from 'color';
import type { CSSVars } from './OneUITheme';

export const mixTwoColors = (firstColor: string, secondColor, weight: number): string => {
    return Color(Color(firstColor).mix(Color(secondColor), weight / 100)).hex();
};

export const generateColorShades = (variables: CSSVars, name: string): CSSVars => {
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
