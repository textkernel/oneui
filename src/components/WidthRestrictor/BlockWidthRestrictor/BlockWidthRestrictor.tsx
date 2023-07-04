import React, { forwardRef } from 'react';
import { bem } from '../../../utils';
import styles from './BlockWidthRestrictor.scss';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Node(s) to be rendered inside the container */
    children?: React.ReactNode;
    /** HTML tag to be used to render the container */
    As?: string;
}

const { block } = bem('BlockWidthRestrictor', styles);

export const BlockWidthRestrictor = forwardRef<HTMLElement, Props>(
    ({ children, As = 'div', ...rest }, ref) => {
        if (!children) {
            return null;
        }

        return (
            <As {...rest} ref={ref} {...block(rest)}>
                {children}
            </As>
        );
    }
);

BlockWidthRestrictor.displayName = 'BlockWidthRestrictor';
