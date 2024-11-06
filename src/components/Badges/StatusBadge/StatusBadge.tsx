import * as React from 'react';
import { bem } from '../../../utils';
import { Context } from '../../../constants';
import styles from './StatusBadge.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Content to be rendered inside the container */
    children: string;
    /** The Callout context (e.g. info, critical, success etc. - defaults to info) */
    context?: Context | 'neutral';
    /** Icon before text, optional */
    leadingIcon?: React.ReactElement;
}

const { block } = bem('StatusBadge', styles);

export const StatusBadge: React.FC<Props> = ({
    context = 'info',
    leadingIcon,
    children,
    ...rest
}) => {
    if (typeof children !== 'number' && !children) {
        return null;
    }

    return (
        <span {...rest} {...block({ context, ...rest })}>
            {leadingIcon}
            {children}
        </span>
    );
};

StatusBadge.displayName = 'StatusBadge';
