import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './Input.scss';
import { CONTEXTS, INPUT_TYPES, SIZES } from '../../constants';

const { block } = bem({
    name: 'Input',
    classnames: styles,
    propsToMods: ['context', 'isBlock', 'size']
});

const Input = props => {
    const { children, context, disabled, isBlock, size, type, value, ...rest } = props;
    return <input {...rest} {...block(props)} type={type} disabled={disabled} value={value} />;
};

Input.displayName = 'Input';

// Any other attributes (onChange, onKeyUp etc.) are
// supported although not defined in propTypes
Input.propTypes = {
    /** The input field context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Should the input field be disabled or not */
    disabled: PropTypes.bool,
    /** Whether or not to show block-level input field (full width) */
    isBlock: PropTypes.bool,
    /** The size of the input field */
    size: PropTypes.oneOf(SIZES),
    /** Type of the input field */
    type: PropTypes.oneOf(INPUT_TYPES),
    /** Current input field value */
    value: PropTypes.string
};

Input.defaultProps = {
    context: 'brand',
    disabled: false,
    isBlock: false,
    size: 'normal',
    type: 'text',
    value: undefined
};

export default Input;
