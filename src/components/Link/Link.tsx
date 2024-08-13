import * as React from 'react';
import { bem } from '../../utils';
import styles from './Link.scss';

export interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link content */
    children?: React.ReactNode;
    /** Color context */
    context?: 'brand' | 'neutral';
    /** Do not underline text on hover */
    dontDecorateOnHover?: boolean;
}

const { block } = bem('Link', styles);

export const Link = React.forwardRef<HTMLAnchorElement, Props>(
    ({ children, context = 'brand', dontDecorateOnHover = false, ...rest }, ref) => {
        if (typeof children !== 'number' && !children) {
            return null;
        }

        return (
            <a ref={ref} {...rest} {...block({ context, dontDecorateOnHover, ...rest })}>
                {children}
            </a>
        );
    }
);

Link.displayName = 'Link';
