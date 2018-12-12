import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './Button.scss';
import { CONTEXTS, SIZES } from '../../constants';

const { block } = bem({
    name: 'Button',
    classnames: styles,
    propsToMods: ['context', 'size', 'isBlock']
});

const Button = props => {
    const { children, disabled, isBlock, onClick, type, ...rest } = props;

    return (
        <button {...rest} {...block(props)} type={type} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

Button.propTypes = {
    /** The label of the button */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** The button context (e.g. brand, primary, bad, good etc. - defaults to neutral) */
    context: PropTypes.oneOf([...CONTEXTS, 'link']),
    /** The size of the button */
    size: PropTypes.oneOf(SIZES),
    /** whether or not to show block - level button(full width) */
    isBlock: PropTypes.bool,
    /** should button be disabled or not */
    disabled: PropTypes.bool,
    /** type of the button */
    type: PropTypes.oneOf(['submit', 'button']),
    /** callback function on click */
    onClick: PropTypes.func
};

Button.defaultProps = {
    context: 'neutral',
    size: 'normal',
    isBlock: false,
    disabled: false,
    type: 'button',
    onClick: null
};

export default Button;
