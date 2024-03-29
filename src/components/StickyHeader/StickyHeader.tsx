import * as React from 'react';
import { bem } from '../../utils';
import classnames from './StickyHeader.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Node to be rendered as a sticky header */
    children: React.ReactNode;
}

const { block } = bem('StickyHeader', classnames);

export const StickyHeader: React.FC<Props> = (props) => {
    const { children, ...rest } = props;
    return (
        <div {...rest} {...block(rest)} role="group">
            {children}
        </div>
    );
};

StickyHeader.displayName = 'StickyHeader';
