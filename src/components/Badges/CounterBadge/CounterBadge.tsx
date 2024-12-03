import * as React from 'react';
import ArrowDownwardRounded from '@material-design-icons/svg/round/arrow_downward.svg';
import ArrowUpwardRounded from '@material-design-icons/svg/round/arrow_upward.svg';
import { bem } from '../../../utils';
import { StatusBadge, StatusBadgeProps } from '../StatusBadge';
import styles from './CounterBadge.scss';

export interface Props extends Omit<StatusBadgeProps, 'leadingIcon' | 'trailingIcon'> {
    /** Trailing icon arrow direction */
    arrowDirection?: 'up' | 'down';
    /** Arrow aria label */
    arrowAriaLabel?: string;
}

const { block } = bem('CounterBadge', styles);

export const CounterBadge: React.FC<Props> = ({
    arrowDirection,
    arrowAriaLabel,
    children,
    ...rest
}) => {
    let trailingIcon: React.ReactElement | undefined;

    if (arrowDirection === 'up') {
        trailingIcon = <ArrowUpwardRounded aria-label={arrowAriaLabel} />;
    } else if (arrowDirection === 'down') {
        trailingIcon = <ArrowDownwardRounded aria-label={arrowAriaLabel} />;
    }

    return (
        <StatusBadge trailingIcon={trailingIcon} {...rest} {...block(rest)}>
            {children}
        </StatusBadge>
    );
};

CounterBadge.displayName = 'CounterBadge';
