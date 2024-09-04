import * as React from 'react';
import { bem } from '../../utils';
import styles from './Text.scss';
import { OldSize as Size, Context } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Text content */
    children: React.ReactNode;
    /** Text should be rendered inline */
    inline?: boolean;
    /** The context of the text, effecting its color (e.g. brand, info, critical, success etc. 'neutral' added as special context here) */
    context?: Context | 'neutral' | 'brand' | 'default';
    /** Custom text sizes */
    size?: Size;
}

const { block } = bem('Text', styles);

export const Text = React.forwardRef<HTMLElement, Props>(
    ({ children, context = 'default', inline = false, size = 'normal', ...rest }, ref) => {
        if (typeof children !== 'number' && !children) {
            return null;
        }

        const HtmlNodeType = inline ? 'span' : 'p';

        return (
            <HtmlNodeType ref={ref} {...rest} {...block({ context, size, ...rest })}>
                {children}
            </HtmlNodeType>
        );
    }
);

Text.displayName = 'Text';
