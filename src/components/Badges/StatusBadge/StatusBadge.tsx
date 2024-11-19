import * as React from 'react';
import { bem } from '../../../utils';
import { Context } from '../../../constants';
import { BadgeVariant } from '../../../constants/component-specific';
import { Text } from '../../Text';
import styles from './StatusBadge.scss';

export interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    /** Content to be rendered inside the container */
    children: string | number;
    /** The Callout context (e.g. info, critical, success etc. - defaults to info) */
    context?: Context | 'neutral';
    /** Icon before text, optional */
    leadingIcon?: React.ReactElement;
    /** Define the badge variant, eg. subtle, bold */
    variant?: BadgeVariant;
}

const { block, elem } = bem('StatusBadge', styles);

export const StatusBadge: React.FC<Props> = ({
    context = 'info',
    variant = 'bold',
    leadingIcon,
    children,
    ...rest
}) => {
    if (typeof children !== 'number' && !children) {
        return null;
    }

    return (
        <div title={children} {...rest} {...block({ context, variant, ...rest })}>
            {leadingIcon && <span {...elem('icon')}>{leadingIcon}</span>}
            <Text inline {...elem('text')}>
                {children}
            </Text>
        </div>
    );
};

StatusBadge.displayName = 'StatusBadge';
