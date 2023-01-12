import * as React from 'react';
import { bem } from '../../../utils';
import styles from './PageWidthRestrictor.scss';
import { NotEmptyReactNode } from '../../../customTypes/types';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node(s) to be rendered inside the container */
    children: NotEmptyReactNode;
}

const { block } = bem('PageWidthRestrictor', styles);

export const PageWidthRestrictor: React.FC<Props> = ({ children, ...rest }) => {
    return (
        <div {...rest} {...block({ ...rest })}>
            {children}
        </div>
    );
};

PageWidthRestrictor.displayName = 'PageWidthRestrictor';
