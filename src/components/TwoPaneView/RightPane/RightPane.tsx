import * as React from 'react';
import { bem } from '../../../utils';
import styles from './RightPane.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node(s) to be rendered in the right pane */
    children?: React.ReactNode;
}

const { block } = bem('RightPane', styles);

export const RightPane: React.FC<Props> = (props) => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

RightPane.displayName = 'RightPane';
