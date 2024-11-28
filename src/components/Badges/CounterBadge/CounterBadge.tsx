import * as React from 'react';
import ArrowDownwardRounded from '@material-design-icons/svg/round/arrow_downward.svg';
import ArrowUpwardRounded from '@material-design-icons/svg/round/arrow_upward.svg';
import { bem } from '../../../utils';
import { StatusBadge, StatusBadgeProps } from '../StatusBadge';
import styles from './CounterBadge.scss';

export interface Props extends Omit<StatusBadgeProps, 'leadingIcon' | 'trailingIcon'> {
    arrowDirection?: 'up' | 'down';
}

const { block } = bem('CounterBadge', styles);

export const CounterBadge: React.FC<Props> = ({ arrowDirection, children, ...rest }) => {
    let trailingIcon: React.ReactElement | undefined;

    if (arrowDirection === 'up') {
        trailingIcon = <ArrowUpwardRounded data-testid="arrow-upward" />;
    } else if (arrowDirection === 'down') {
        trailingIcon = <ArrowDownwardRounded data-testid="arrow-downward" />;
    }

    return (
        <StatusBadge trailingIcon={trailingIcon} {...rest} {...block(rest)}>
            {children}
        </StatusBadge>
    );
};

CounterBadge.displayName = 'CounterBadge';
