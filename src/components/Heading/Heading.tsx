import * as React from 'react';
import { bem } from '../../utils';
import styles from './Heading.scss';
import { HEADING_SIZES } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    /** Heading text */
    children: React.ReactNode;
    /** Heading size (h1, h2, ...) */
    level?: typeof HEADING_SIZES[number];
    /** Heading text alignment */
    align?: 'left' | 'center' | 'right';
    /** Should the heading have neutral color or not */
    isNeutral?: boolean;
}

const { block } = bem('Heading', styles);

export const Heading = React.forwardRef<HTMLElement, Props>(
    ({ align = 'left', children, isNeutral, level = 'h1', ...rest }, ref) => {
        const HtmlNodeType = level;

        if (!children) {
            return null;
        }

        return (
            <HtmlNodeType ref={ref} {...rest} {...block({ level, align, isNeutral, ...rest })}>
                {children}
            </HtmlNodeType>
        );
    }
);

Heading.displayName = 'Heading';
