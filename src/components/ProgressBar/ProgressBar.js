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
    const { animated, context, hidden, label, percentage, small, ...rest } = props;
    const percentageAdjusted = Math.max(0, Math.min(percentage, 100));

    return (
        <div {...rest} {...block(props)}>
            <div
                {...elem('fill', props)}
                style={{
                    width: `${percentageAdjusted}%`
                }}
            >
                {!small && (label || `${Number(percentageAdjusted)}%`)}
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    /** Show progress activity with animation */
    animated: PropTypes.bool,
    /** The progress bar context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Hides the progress bar if true */
    hidden: PropTypes.bool,
    /** Text to show instead of percentage */
    label: PropTypes.node,
    /** Percentage of progress bar to be filled */
    percentage: PropTypes.number.isRequired,
    small: PropTypes.bool
};

ProgressBar.defaultProps = {
    animated: false,
    context: 'brand',
    hidden: false,
    label: null,
    small: false
};

export default ProgressBar;
