/**
 * @module OneUITheme
 */
import {
    colorVariables,
    computedColorVariables,
    headerFooterVariables,
    miscVariables,
    sizingVariables,
    typographyVariables,
} from './baseVariables';

export type CSSVars = {
    [key: string]: string;
};

export function OneUITheme(customVariables: CSSVars = {}): CSSVars {
    const baseVariables = {
        ...colorVariables,
        ...headerFooterVariables,
        ...miscVariables,
        ...sizingVariables,
        ...typographyVariables,
        ...customVariables,
    };

    return {
        ...baseVariables,
        ...computedColorVariables(baseVariables),
    };
}
