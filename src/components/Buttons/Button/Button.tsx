import React from 'react';
import bem from '../../../utils/bem';
import styles from './Button.scss';
import { ButtonTypes, ContextTypes, SizesTypes } from '../../../constants';

// Any other attributes (onClick, onFocus etc.) are
// supported although not defined in propTypes
interface Props extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
    /** The label of the button */
    children: [string, Node];
    /** The button context (e.g. brand, primary, bad, good etc. - defaults to neutral) */
    context: ContextTypes | 'link';
    /** The size of the button */
    size: SizesTypes;
    /** Whether or not to show block-level button (full width) */
    isBlock: boolean;
    /** Whether or not to show inline button (without padding) */
    isInline: boolean;
    /** Should button be disabled or not */
    disabled: boolean;
    /** Type of the button */
    type: ButtonTypes;
    /** Providing an href will render an <a> element, styled as a button. */
    href?: string;
}

const { block } = bem('Button', styles);

const Button: React.FC<Props> = React.forwardRef((props, ref?: React.Ref<HTMLButtonElement>) => {
    const { children, context, disabled, isBlock, isInline, type, href, size, ...rest } = props;

    if (href) {
        return (
            <a {...rest} {...block(props)} ref={ref} href={href}>
                {children}
            </a>
        );
    }

    return (
        <button {...rest} {...block(props)} ref={ref} type={type} disabled={disabled}>
            {children}
        </button>
    );
});

Button.displayName = 'Button';

Button.defaultProps = {
    context: 'neutral',
    size: 'normal',
    isBlock: false,
    isInline: false,
    disabled: false,
    type: 'button',
};

export default Button;
