import * as React from 'react';
import { bem } from '../../utils';
import { ContentPlaceholder } from '../ContentPlaceholder';
import { Context, GAUGE_RADIUS } from '../../constants';
import styles from './Gauge.scss';

const SET_PERCENTAGE_DELAY = 100;

const { block, elem } = bem('Gauge', styles);

interface Props {
    /** The gauge context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context?: Context;
    /** Defines if progress bar is in loading state */
    isProgressLoading?: boolean;
    /** Defines if content part is in loading state */
    isContentLoading?: boolean;
    /** Percentage of the progress bar to be filled */
    percentage?: number;
    /** Content component */
    children: NotEmptyReactNode;
    /** String value to be used as metric part below the child */
    metric?: string;
    /** Note component to be rendered below the gauge */
    note?: SingleReactNode;
}

export const Gauge: React.FC<Props> = (props) => {
    const {
        children,
        percentage = 0,
        context,
        note,
        metric,
        isProgressLoading,
        isContentLoading,
        ...rest
    } = props;
    const [percentageToShow, setPercentageToShow] = React.useState(0);

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

    return (
        <div {...rest} {...block(props)}>
            <svg {...elem('svg', props)} width="100%">
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
                    stroke={`var(--color-${context})`}
                />
            </svg>
            <div {...elem('contentWrapper', props)}>
                {isContentLoading ? (
                    <ContentPlaceholder height={28} {...elem('contentPlaceholder', props)} />
                ) : (
                    <div {...elem('content', props)}>
                        {children}
                        {metric ? (
                            <div {...elem('metric', props)} title={metric}>
                                {metric}
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
            {note ? <div {...elem('note', props)}>{note}</div> : null}
        </div>
    );
};

Gauge.displayName = 'Gauge';

Gauge.defaultProps = {
    context: 'brand',
    isProgressLoading: false,
    isContentLoading: false,
    metric: '',
};
