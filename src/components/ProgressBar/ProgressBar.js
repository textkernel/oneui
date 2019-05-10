import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './ProgressBar.scss';
import { CONTEXTS } from '../../constants';

const { block, elem } = bem({
    name: 'ProgressBar',
    classnames: styles,
    propsToMods: ['animated', 'context', 'hidden', 'small']
});

const ProgressBar = props => {
    const { animated, children, context, hidden, percentage, small, ...rest } = props;
    const percentageAdjusted = Math.max(0, Math.min(percentage, 100));

    return (
        <div
            {...rest}
            {...block(props)}
            role="progressbar"
            aria-hidden={hidden}
            aria-valuenow={percentageAdjusted}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuetext={children}
        >
            <div
                {...elem('fill', props)}
                style={{
                    width: `${percentageAdjusted}%`
                }}
            >
                {!small && (children || `${Number(percentageAdjusted)}%`)}
            </div>
        </div>
    );
};

ProgressBar.displayName = 'ProgressBar';

ProgressBar.propTypes = {
    /** Show progress activity with animation */
    animated: PropTypes.bool,
    /** Text to show instead of percentage */
    children: PropTypes.node,
    /** The progress bar context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Hides the progress bar if true */
    hidden: PropTypes.bool,
    /** Percentage of progress bar to be filled */
    percentage: PropTypes.number.isRequired,
    /** Renders a narrow bar without label or percentage */
    small: PropTypes.bool
};

ProgressBar.defaultProps = {
    animated: false,
    children: null,
    context: 'brand',
    hidden: false,
    small: false
};

export default ProgressBar;
