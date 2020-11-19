import * as React from 'react';
import PropTypes from 'prop-types';
import { bem } from '../../utils';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { CONTEXTS } from '../../constants';
import styles from './Gauge.scss';

const { block, elem } = bem('Gauge', styles);

export const Gauge = (props) => {
    const { children, context, isLoading, percentage, value, metric, ...rest } = props;

    const progress = isLoading ? 0 : percentage / 100;
    const radius = 100;
    const circumference = 2 * Math.PI * radius;
    const circumferenceHalf = circumference / 2;
    const strokeDasharrayBackground = `${circumferenceHalf} ${circumference}`;
    const strokeDasharrayForeground = `${progress * circumferenceHalf} ${circumference}`;

    return (
        <div {...rest} {...block(props)}>
            <svg {...elem('svg', props)} width="100%">
                <linearGradient id={`Gauge__gradient--${context}`}>
                    <stop className={`Gauge__gradientStart--${context}`} offset="50%" />
                    <stop className={`Gauge__gradientEnd--${context}`} offset="100%" />
                </linearGradient>
                <circle
                    {...elem('circleBackground', props)}
                    r={radius}
                    cx="50%"
                    cy="25%"
                    style={{
                        strokeDasharray: strokeDasharrayBackground,
                    }}
                />
                <circle
                    {...elem('circleForeground', props)}
                    r={radius}
                    cx="50%"
                    cy="25%"
                    style={{
                        strokeDasharray: strokeDasharrayForeground,
                    }}
                    stroke={`url(#Gauge__gradient--${context})`}
                />
            </svg>
            <div {...elem('valueWrapper', props)}>
                {isLoading ? (
                    <ContentPlaceholder height={28} {...elem('contentPlaceholder', props)} />
                ) : (
                    <span {...elem('value', props)}>
                        {value}
                        {!!metric && <span {...elem('metric', props)}>{metric}</span>}
                    </span>
                )}
            </div>
            {!!children && <div {...elem('bottom', props)}>{children}</div>}
        </div>
    );
};

Gauge.displayName = 'Gauge';

Gauge.propTypes = {
    context: PropTypes.oneOf(CONTEXTS),
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    percentage: PropTypes.number,
    value: PropTypes.node,
    metric: PropTypes.node,
};

Gauge.defaultProps = {
    context: 'brand',
    children: null,
    isLoading: false,
    percentage: null,
    value: null,
    metric: null,
};
