/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import * as React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import 'tippy.js/dist/tippy.css?external';
import 'tippy.js/animations/shift-toward.css?external';

export const Tooltip: React.FC<TippyProps> = (props) => {
    const { content, children, disabled, ...rest } = props;
    let isDisabled = disabled;
    if (disabled === undefined && !content) {
        isDisabled = true;
    }
    return (
        <Tippy content={content} disabled={isDisabled} {...rest}>
            {children}
        </Tippy>
    );
};

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
    animation: 'shift-toward',
};
