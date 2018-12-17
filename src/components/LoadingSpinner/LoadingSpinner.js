import React from 'react';
import PropTypes from 'prop-types';
import Text from '../Text';
import bem from '../../packages/bem';
import styles from './LoadingSpinner.scss';
import { CONTEXTS } from '../../constants';

const { block, elem } = bem({
    name: 'LoadingSpinner',
    classnames: styles,
    propsToMods: ['context', 'hidden']
});

const LoadingSpinner = props => {
    const { context, hidden, label, size, ...rest } = props;
    return (
        <div {...rest} {...block(props)}>
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
            {!!label && (
                <Text inline {...elem('label', props)}>
                    {label}
                </Text>
            )}
        </div>
    );
};

LoadingSpinner.propTypes = {
    /** The spinner context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Hides the spinner when true */
    hidden: PropTypes.bool,
    /** Loading text */
    label: PropTypes.node,
    /** Custom spinner size (will affect both width and height) */
    size: PropTypes.number
};

LoadingSpinner.defaultProps = {
    context: 'brand',
    hidden: false,
    label: null,
    size: null
};

export default LoadingSpinner;
