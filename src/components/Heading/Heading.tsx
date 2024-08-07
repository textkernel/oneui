import * as React from 'react';
import { bem } from '../../utils';
import styles from './Heading.scss';

const HEADING_SIZES = ['h1', 'h2', 'h3'] as const;

export interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    /** Heading text */
    children: React.ReactNode;
    /** Heading size (h1, h2, ...) */
    level?: (typeof HEADING_SIZES)[number];
    /** Heading text alignment */
    align?: 'left' | 'center' | 'right';
    /** Should the heading have neutral color or not */
    isNeutral?: boolean;
}

const { block } = bem('Heading', styles);

export const Heading = React.forwardRef<HTMLElement, Props>(
    ({ align = 'left', children, isNeutral, level = 'h1', ...rest }, ref) => {
        if (typeof children !== 'number' && !children) {
            return null;
        }

        const HtmlNodeType = level;

        return (
            <HtmlNodeType ref={ref} {...rest} {...block({ level, align, isNeutral, ...rest })}>
                {children}
            </HtmlNodeType>
        );
    }
);

Heading.displayName = 'Heading';
