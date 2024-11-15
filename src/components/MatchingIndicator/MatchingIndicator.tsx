import * as React from 'react';
import { bem } from '../../utils';
import styles from './MatchingIndicator.scss';

const COLORS_MAX_VALUES = {
    RED: 30,
    YELLOW: 50,
    GREEN: 100,
};

export interface Props extends React.HTMLAttributes<HTMLOrSVGElement> {
    /** Percentage of the matching indicator filled */
    percentage: number;
}

const { block } = bem('MatchingIndicator', styles);

export const MatchingIndicator: React.FC<Props> = ({ percentage, ...rest }) => {
    if (percentage < 0 || percentage > 100) {
        return undefined;
    }

    const computeMatchingIndicatorPercentageColor = (value: number) => {
        if (value <= COLORS_MAX_VALUES.RED) {
            return 'var(--color-icon-critical-default)';
        }
        if (value <= COLORS_MAX_VALUES.YELLOW) {
            return 'var(--color-icon-cautious-default)';
        }
        return 'var(--color-icon-success-default)';
    };

    return (
        <svg {...rest} {...block({ ...rest })}>
            <circle
                r="9"
                cx="50%"
                cy="50%"
                stroke="var(--color-background-neutral-subtle-default)"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
            />
            <circle
                r="9"
                cx="50%"
                cy="50%"
                stroke={computeMatchingIndicatorPercentageColor(percentage)}
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 56}, 56`}
            />
        </svg>
    );
};

MatchingIndicator.displayName = 'MatchingIndicator';
