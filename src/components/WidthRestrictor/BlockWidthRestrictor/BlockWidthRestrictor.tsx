import React, { forwardRef } from 'react';
import { bem } from '../../../utils';
import styles from './BlockWidthRestrictor.scss';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Node(s) to be rendered inside the container */
    children: NotEmptyReactNode;
    /** HTML tag to be used to render the container */
    As?: string;
    /** Ref to access the main wrapper element */
    ref?: React.RefObject<HTMLElement>;
}

const { block } = bem('BlockWidthRestrictor', styles);

export const BlockWidthRestrictor = forwardRef<React.Ref<any>, Props>(
    ({ children, As = 'div', ...rest }, ref) => {
        return (
            <As {...rest} ref={ref} {...block(rest)}>
                {children}
            </As>
        );
    }
);

BlockWidthRestrictor.displayName = 'BlockWidthRestrictor';
