import * as React from 'react';
import { bem } from '../../utils';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { GAUGE_RADIUS } from '../../constants';
import styles from './Gauge.scss';

const SET_PERCENTAGE_DELAY = 100;

const { block, elem } = bem('Gauge', styles);

export interface Props {
    /** Defines if progress bar is in loading state */
    isProgressLoading?: boolean;
    /** Defines if content part is in loading state */
    isContentLoading?: boolean;
    /** Percentage of the progress bar to be filled */
    percentage?: number;
    /** Content component */
    children: React.ReactNode;
    /** String value to be used as metric part below the child */
    metric?: string;
    /** Note component to be rendered below the gauge */
    note?: React.ReactNode;
}

/**
 * ## Testing information
 * This component is uses `Math.random` internally which will show up in snapshots.
 * To make sure snapshots are consistent you should mock it in your tests. E.g.:

      const mathRandomSpy = jest.spyOn(Math, 'random');
      mathRandomSpy.mockImplementation(() => 0.42);
 */
export const Gauge: React.FC<Props> = ({
    children,
    percentage = 0,
    note,
    metric = '',
    isProgressLoading = false,
    isContentLoading = false,
    ...rest
}) => {
    const [percentageToShow, setPercentageToShow] = React.useState(0);
    // We need this uuid for the linear gradient's id to avoid some bugs in Safari.
    // For details see: https://jira.textkernel.nl/browse/JF-2780

    // Simulate a prop change to run the animation on render.
    // There's a small delay set because of a weird bug
    // with preventing of the animation being run with a child wrapped up into a Tooltip.
    React.useEffect(() => {
        const percentageTimeout = setTimeout(() => {
            setPercentageToShow(percentage);
        }, SET_PERCENTAGE_DELAY);

        return () => {
            clearTimeout(percentageTimeout);
        };
    }, [percentage]);

    const percentageAdjusted = Math.max(0, Math.min(100, percentageToShow)) / 100;
    const progress = isProgressLoading ? 0 : percentageAdjusted;
    const circumference = 2 * Math.PI * GAUGE_RADIUS;
    const circumferenceHalf = circumference / 2;

    if (typeof children !== 'number' && !children) {
        return null;
    }

    return (
        <div {...rest} {...block({ isProgressLoading, isContentLoading, ...rest })}>
            <svg {...elem('svg')} width="100%">
                <circle
                    {...elem('circleBackground')}
                    r={GAUGE_RADIUS}
                    cx="50%"
                    cy="25%"
                    style={{ strokeDasharray: `${circumferenceHalf} ${circumference}` }}
                />
                <circle
                    {...elem('circleForeground', { isProgressLoading })}
                    r={GAUGE_RADIUS}
                    cx="50%"
                    cy="25%"
                    style={{ strokeDasharray: `${progress * circumferenceHalf} ${circumference}` }}
                />
            </svg>
            <div {...elem('contentWrapper', { isContentLoading })}>
                {isContentLoading ? (
                    <ContentPlaceholder height={28} {...elem('contentPlaceholder')} />
                ) : (
                    <div {...elem('content')}>
                        {children}
                        {metric ? (
                            <div {...elem('metric')} title={metric}>
                                {metric}
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
            {note ? <div {...elem('note')}>{note}</div> : null}
        </div>
    );
};

Gauge.displayName = 'Gauge';
