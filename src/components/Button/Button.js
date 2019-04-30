import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './Button.scss';
import { CONTEXTS, SIZES } from '../../constants';

const { block } = bem({
    name: 'Button',
    classnames: styles,
    propsToMods: ['context', 'size', 'isBlock', 'isInline']
});

const Button = props => {
    const { children, context, disabled, isBlock, isInline, type, href, ...rest } = props;

    return href ? (
        <a {...rest} {...block(props)} hfer={href}>
            {children}
        </a>
    ) : (
        <button {...rest} {...block(props)} type={type} disabled={disabled}>
            {children}
        </button>
    );
};

Button.displayName = 'Button';

// Any other attributes (onClick, onFocus etc.) are
// supported although not defined in propTypes
Button.propTypes = {
    /** The label of the button */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** The button context (e.g. brand, primary, bad, good etc. - defaults to neutral) */
    context: PropTypes.oneOf([...CONTEXTS, 'link']),
    /** The size of the button */
    size: PropTypes.oneOf(SIZES),
    /** Whether or not to show block-level button (full width) */
    isBlock: PropTypes.bool,
    /** Whether or not to show inline button (without padding) */
    isInline: PropTypes.bool,
    /** Should button be disabled or not */
    disabled: PropTypes.bool,
    /** Type of the button */
    type: PropTypes.oneOf(['submit', 'button']),
    /** Providing an href will render an <a> element, styled as a button. */
    href: PropTypes.string
};

Button.defaultProps = {
    context: 'neutral',
    size: 'normal',
    isBlock: false,
    isInline: false,
    disabled: false,
    type: 'button',
    href: null
};

export default Button;
