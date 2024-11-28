import * as React from 'react';
import { bem } from '../../../utils';
import { BadgeVariant, Context } from '../../../constants';
import styles from './StatusBadge.scss';

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    /** Content to be rendered inside the container */
    children: string | number;
    /** The Callout context (e.g. info, critical, success etc. - defaults to info) */
    context?: Context | 'neutral';
    /** Icon before text, optional */
    leadingIcon?: React.ReactElement;
    /** Icon after text, optional */
    trailingIcon?: React.ReactElement;
    /** Define the badge variant, eg. subtle, bold */
    variant?: BadgeVariant;
}

const { block, elem } = bem('StatusBadge', styles);

export const StatusBadge: React.FC<Props> = ({
    context = 'info',
    variant = 'bold',
    leadingIcon,
    trailingIcon,
    children,
    ...rest
}) => {
    if (typeof children !== 'number' && !children) {
        return null;
    }

    return (
        <div title={children} {...rest} {...block({ context, variant, ...rest })}>
            {leadingIcon &&
                React.cloneElement(leadingIcon, {
                    viewBox: '0 0 24 24',
                    fill: 'currentColor',
                    ...elem('icon'),
                })}
            <span {...elem('text')}>{children}</span>
            {trailingIcon &&
                React.cloneElement(trailingIcon, {
                    viewBox: '0 0 24 24',
                    fill: 'currentColor',
                    ...elem('icon'),
                })}
        </div>
    );
};

StatusBadge.displayName = 'StatusBadge';
