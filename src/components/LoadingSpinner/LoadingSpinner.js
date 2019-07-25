import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Text } from '../Text';
import styles from './LoadingSpinner.scss';
import { CONTEXTS } from '../../constants';

const { block, elem } = bem({
    name: 'LoadingSpinner',
    classnames: styles,
    propsToMods: ['centerIn', 'context', 'hidden']
});

const LoadingSpinner = props => {
    const { centerIn, children, context, hidden, size, ...rest } = props;
    return (
        <div {...rest} {...block(props)} role="status" aria-busy={!hidden} aria-hidden={hidden}>
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
                {...elem('svg', props)}
            >
                <circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                    {...elem('path', props)}
                />
            </svg>
            {!!children && (
                <Text inline {...elem('label', props)}>
                    {children}
                </Text>
            )}
        </div>
    );
};

LoadingSpinner.displayName = 'LoadingSpinner';

LoadingSpinner.propTypes = {
    /** Center the spinner relative to parent element or viewport */
    centerIn: PropTypes.oneOf(['parent', 'viewport']),
    /** Loading text */
    children: PropTypes.node,
    /** The spinner context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Hides the spinner when true */
    hidden: PropTypes.bool,
    /** Custom spinner size (will affect both width and height) */
    size: PropTypes.number
};

LoadingSpinner.defaultProps = {
    centerIn: null,
    children: null,
    context: 'brand',
    hidden: false,
    size: null
};

export default LoadingSpinner;
