import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './LoadingSpinner.scss';
import { CONTEXTS } from '../../constants';

const { block, elem } = bem({
    name: 'LoadingSpinner',
    classnames: styles,
    propsToMods: ['context', 'hidden']
});

const LoadingSpinner = props => {
    const { context, hidden, size, ...rest } = props;
    return (
        <svg
            viewBox={[0, 0, 44, 44]}
            style={(s => {
                if (!s) {
                    return null;
                }
                return {
                    width: s,
                    height: s
                };
            })(size)}
            {...rest}
            {...block(props)}
        >
            <circle cx="22" cy="22" r="20" fill="none" strokeWidth="4" {...elem('path', props)} />
        </svg>
    );
};

LoadingSpinner.propTypes = {
    /** The spinner context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Hides the spinner when true */
    hidden: PropTypes.bool,
    /** Custom spinner size (will affect both width and height) */
    size: PropTypes.number
};

LoadingSpinner.defaultProps = {
    context: 'brand',
    hidden: false,
    size: null
};

export default LoadingSpinner;
