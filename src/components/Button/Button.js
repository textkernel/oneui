import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './Button.scss';
import { CONTEXTS, SIZES } from '../../constants';

const Button = props => {
    const { children, disabled, htmlAttributes, onClick, style, type, block } = props;
    return (
        <button
            {...block()}
            type={type}
            style={style}
            onClick={onClick}
            disabled={disabled}
            {...htmlAttributes}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    /** The label of the button */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** The button context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf([...CONTEXTS, 'link']),
    /** The size of the button */
    size: PropTypes.oneOf(SIZES),
    /** whether or not to show block - level button(full width) */
    isBlock: PropTypes.bool,
    /** should button be disabled or not */
    disabled: PropTypes.bool,
    /** type of the button */
    type: PropTypes.oneOf(['submit', 'button']),
    /** optional html attrinutes such as target, href, mouseOver etc. */
    htmlAttributes: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool])
    ),
    /** callback function on click */
    onClick: PropTypes.func,
    /** inline styles */
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** additional class names */
    className: PropTypes.string
};

Button.defaultProps = {
    context: 'neutral',
    size: 'normal',
    isBlock: false,
    disabled: false,
    type: 'button',
    htmlAttributes: {},
    onClick: null,
    style: null,
    className: ''
};

Button.propsToMods = ['context', 'size', 'isBlock'];

export default bem(styles)(Button);
