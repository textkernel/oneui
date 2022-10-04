import * as React from 'react';
import { bem } from '../../utils';
import styles from './Heading.scss';
import { HEADING_SIZES, Context } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    /** Heading text */
    children: NotEmptyReactNode;
    /** Heading size (h1, h2, ...) */
    level?: typeof HEADING_SIZES[number];
    /** Heading text alignment */
    align?: 'left' | 'center' | 'right';
    /** The context of the text, effecting its color (e.g. primary, secondary,  bad, good etc. 'muted' added as special context here) */
    context?: Context | 'muted' | 'default';
    /** Ref to access the span element */
    ref?: React.RefObject<HTMLElement>;
}

const { block } = bem('Heading', styles);

export const Heading = React.forwardRef<HTMLElement, Props>(
    ({ align = 'left', children, context = 'default', level = 'h1', ...rest }, ref) => {
        const HtmlNodeType = level;

        return (
            <HtmlNodeType ref={ref} {...rest} {...block({ level, align, context, ...rest })}>
                {children}
            </HtmlNodeType>
        );
    }
);

Heading.displayName = 'Heading';
