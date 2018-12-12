import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './Button.scss';
import { CONTEXTS, SIZES } from '../../constants';

const Button = props => {
    const { children, disabled, htmlAttributes, onClick, style, className, type, block } = props;
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
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    context: PropTypes.oneOf(CONTEXTS), // The button context (e.g. brand, primary, bad, good etc. - defaults to brand)
    size: PropTypes.oneOf(SIZES), // the size of the button
    block: PropTypes.bool, // whether or not to show block - level button(full width)
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['submit', 'button']), // type of the button
    htmlAttributes: PropTypes.objectOf(PropTypes.string), // optional html attrinutes such as target, href, mouseOver etc.
    onClick: PropTypes.func, // callback function on click
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    className: PropTypes.string // additional class names
};

Button.defaultProps = {
    context: 'brand',
    size: 'normal',
    block: false,
    disabled: false,
    type: 'button',
    htmlAttributes: {},
    onClick: null,
    style: null,
    className: ''
};

Button.propsToMods = ['context', 'size', 'block'];

export default bem(styles)(Button);
