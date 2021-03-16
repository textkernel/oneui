import * as React from 'react';
import { bem } from '../../utils';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { Context, GAUGE_RADIUS } from '../../constants';
import styles from './Gauge.scss';

const { block, elem } = bem('Gauge', styles);

interface Props {
    context?: Context;
    children?: ReactNode;
    isProgressLoading?: boolean;
    isContentLoading?: boolean;
    percentage: number;
    value: NotEmptyReactNode;
    metric?: ReactNode;
}

export const Gauge: React.FC<Props> = (props) => {
    const {
        children,
        percentage,
        context,
        value,
        metric,
        isProgressLoading,
        isContentLoading,
        ...rest
    } = props;

    const percentageAdjusted = Math.max(0, Math.min(100, percentage)) / 100;
    const progress = isProgressLoading ? 0 : percentageAdjusted;
    const circumference = 2 * Math.PI * GAUGE_RADIUS;
    const circumferenceHalf = circumference / 2;

    return (
        <div {...rest} {...block(props)}>
            <svg {...elem('svg', props)} width="100%">
                <linearGradient id={`Gauge__gradient--${context}`}>
                    <stop className={`Gauge__gradientStart--${context}`} offset="50%" />
                    <stop className={`Gauge__gradientEnd--${context}`} offset="100%" />
                </linearGradient>
                <circle
                    {...elem('circleBackground', props)}
                    r={GAUGE_RADIUS}
                    cx="50%"
                    cy="25%"
                    style={{ strokeDasharray: `${circumferenceHalf} ${circumference}` }}
                />
                <circle
                    {...elem('circleForeground', props)}
                    r={GAUGE_RADIUS}
                    cx="50%"
                    cy="25%"
                    style={{ strokeDasharray: `${progress * circumferenceHalf} ${circumference}` }}
                    stroke={`url(#Gauge__gradient--${context})`}
                />
            </svg>
            <div {...elem('contentWrapper', props)}>
                {isContentLoading ? (
                    <ContentPlaceholder height={28} {...elem('contentPlaceholder', props)} />
                ) : (
                    <span {...elem('value', props)}>
                        {value}
                        {metric ? <span {...elem('metric', props)}>{metric}</span> : null}
                    </span>
                )}
            </div>
            {children ? <div {...elem('bottom', props)}>{children}</div> : null}
        </div>
    );
};

Gauge.displayName = 'Gauge';

Gauge.defaultProps = {
    children: null,
    context: 'brand',
    isProgressLoading: false,
    isContentLoading: false,
    metric: null,
};
