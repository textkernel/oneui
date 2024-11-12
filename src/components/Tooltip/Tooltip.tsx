/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import * as React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/animations/shift-toward.css?external';
import 'tippy.js/dist/tippy.css?external';

export type TooltipProps = TippyProps;

/**
 * ## Usage information
 * This component is a wrapper around [tippy.js/react](https://github.com/atomiks/tippy.js-react#-usage).
 *
 * * You can pass other props according to their definition, apart from the one listed below.
 * * Full list of props available can be found [here](https://atomiks.github.io/tippyjs/all-props/).
 * * When using a [React component as children](https://github.com/atomiks/tippyjs-react#component-children), make sure it supports forward ref
 */
export const Tooltip: React.FC<TooltipProps> = ({ content, children, disabled, ...rest }) => {
    let isDisabled = disabled;
    if (disabled === undefined && !content) {
        isDisabled = true;
    }
    return (
        <Tippy content={content} disabled={isDisabled} maxWidth={320} arrow={false} {...rest}>
            {children}
        </Tippy>
    );
};

Tooltip.displayName = 'Tooltip';
