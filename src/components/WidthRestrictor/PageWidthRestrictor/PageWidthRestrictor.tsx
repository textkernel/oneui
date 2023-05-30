import * as React from 'react';
import { bem } from '../../../utils';
import styles from './PageWidthRestrictor.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node(s) to be rendered inside the container */
    children?: React.ReactNode;
}

const { block } = bem('PageWidthRestrictor', styles);

export const PageWidthRestrictor: React.FC<Props> = ({ children, ...rest }) => {
    if (!children) {
        return null;
    }

    return (
        <div {...rest} {...block({ ...rest })} role="group">
            {children}
        </div>
    );
};

PageWidthRestrictor.displayName = 'PageWidthRestrictor';
