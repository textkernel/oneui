import * as React from 'react';
import { bem } from '../../utils';
import styles from './ProgressBar.scss';
import { Context } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Percentage of progress bar to be filled */
    percentage: number;
    /** Show progress activity with animation */
    animated?: boolean;
    /** Text to show instead of percentage */
    children?: ReactNode;
    /** The progress bar context (e.g. primary, secondary, bad, good etc. - defaults to primary) */
    context?: Context;
    /** Hides the progress bar if true */
    hidden?: boolean;
    /** Renders a narrow bar without label or percentage */
    small?: boolean;
}

const { block, elem } = bem('ProgressBar', styles);

export const ProgressBar: React.FC<Props> = ({
    animated = false,
    children = null,
    context = 'primary',
    hidden = false,
    percentage,
    small = false,
    ...rest
}) => {
    const percentageAdjusted = Math.max(0, Math.min(percentage, 100));

    return (
        <div
            {...rest}
            {...block({ context, animated, hidden, small })}
            role="progressbar"
            aria-hidden={hidden}
            aria-valuenow={percentageAdjusted}
            aria-valuemin="0"
            aria-valuemax="100"
        >
            <div
                {...elem('fill', { animated, context, small })}
                style={{
                    width: `${percentageAdjusted}%`,
                }}
            >
                {!small && (children || `${Number(percentageAdjusted)}%`)}
            </div>
        </div>
    );
};

ProgressBar.displayName = 'ProgressBar';
