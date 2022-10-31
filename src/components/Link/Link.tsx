import * as React from 'react';
import { bem } from '../../utils';
import styles from './Link.scss';

export interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link content */
    children: NotEmptyReactNode;
    /** Color context */
    context?: 'primary' | 'muted';
    /** Do not underline text on hover */
    dontDecorateOnHover?: boolean;
}

const { block } = bem('Link', styles);

export const Link = React.forwardRef<HTMLAnchorElement, Props>(
    ({ children, context = 'primary', dontDecorateOnHover = false, ...rest }, ref) => {
        return (
            <a ref={ref} {...rest} {...block({ context, dontDecorateOnHover, ...rest })}>
                {children}
            </a>
        );
    }
);

Link.displayName = 'Link';
