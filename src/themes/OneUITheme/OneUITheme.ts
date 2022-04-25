/**
 * @module OneUITheme is responsible for storing theme variables.
 * Theme variables are custom CSS properties that controls
 * the appearance of OneUI components.
 *
 * There are a few types of variables:
 * - colors;
 * - sizing;
 * - typography;
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
