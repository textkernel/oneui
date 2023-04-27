import * as React from 'react';
import { bem } from '../../../utils';
import styles from './ListActions.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Actions to be pushed to the left side of a List Item */
    children?: React.ReactNode;
}

const { block } = bem('ListActions', styles);

export const ListActions: React.FC<Props> = ({ children, ...rest }) => (
    <div {...rest} {...block(rest)}>
        {children}
    </div>
);

ListActions.displayName = 'ListActions';
