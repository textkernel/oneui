import React, { forwardRef } from 'react';
import { bem } from '../../../utils';
import styles from './LeftPane.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node(s) to be rendered in the left pane */
    children?: ReactNode;
}

const { block } = bem('LeftPane', styles);

export const LeftPane = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, ...rest } = props;

    return (
        <div {...rest} ref={ref} {...block(props)}>
            {children}
        </div>
    );
});

LeftPane.displayName = 'LeftPane';
