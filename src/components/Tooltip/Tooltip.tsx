/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import * as React from 'react';
import Tippy, { TippyProps } from '@tippy.js/react';
import 'tippy.js/dist/tippy.css?external';
import 'tippy.js/animations/shift-toward.css?external';

export const Tooltip: React.FC<TippyProps> = (props) => {
    const { content, children, ...rest } = props;

    return (
        <Tippy content={content} {...rest}>
            {children}
        </Tippy>
    );
};

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
    animation: 'shift-toward',
};
