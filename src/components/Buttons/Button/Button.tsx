import React, { forwardRef } from 'react';
import { bem } from '../../../utils';
import { mergeRefs } from '../../../utils/mergeRefs';
import styles from './Button.scss';
import { ButtonContext, ButtonType, ButtonVariant, Size } from '../../../constants';
import { LoadingSpinner } from '../../LoadingSpinner';

export interface Props
    extends Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement> &
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'size'
    > {
    /** The label of the button */
    children: React.ReactNode;
    /** Define the button context, eg. primary, secondary, critical */
    context?: ButtonContext;
    /** The size of the button */
    size?: Size;
    /** Whether or not to show block-level button (full width) */
    isBlock?: boolean;
    /** Whether or not to show the button in loading state */
    isLoading?: boolean;
    /** Should button be disabled or not */
    disabled?: boolean;
    /** Type of the button */
    type?: ButtonType;
    /** Providing a href will render an <a> element, styled as a button. */
    href?: string;
    /** Define the button variant, eg. filled, outlined  */
    variant?: ButtonVariant;
}

const { block } = bem('Button', styles);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
    (
        {
            children,
            disabled = false,
            isBlock = false,
            isLoading = false,
            type = 'button',
            href,
            size = 'medium',
            variant = 'filled',
            context = 'secondary',
            ...rest
        },
        ref
    ) => {
        const buttonRef = React.useRef<HTMLButtonElement>();
        const [buttonWidth, setButtonWidth] = React.useState<number>();
        // figure out width of button, and add that width as styling

        if (buttonRef.current && isLoading && !buttonWidth) {
            setButtonWidth(buttonRef.current.offsetWidth);
        }

        if (!isLoading && buttonWidth) {
            setButtonWidth(undefined); // Reset to auto width when not loading
        }

        if (typeof children !== 'number' && !children) {
            return null;
        }

        if (href) {
            return (
                <a
                    {...rest}
                    {...block({
                        isBlock,
                        isLoading,
                        size,
                        variant,
                        context,
                        ...rest,
                    })}
                    ref={mergeRefs([ref, buttonRef])}
                    href={href}
                    style={{ width: buttonWidth ? `${buttonWidth}px` : undefined }}
                >
                    {isLoading ? (
                        <LoadingSpinner
                            size={16}
                            context={variant === 'filled' ? 'inverted' : context}
                        />
                    ) : (
                        children
                    )}
                </a>
            );
        }

        return (
            <button
                {...rest}
                {...block({
                    isBlock,
                    isLoading,
                    size,
                    variant,
                    context,
                    ...rest,
                })}
                ref={mergeRefs([ref, buttonRef])}
                type={type}
                style={{ width: buttonWidth ? `${buttonWidth}px` : undefined }}
                disabled={disabled || isLoading}
            >
                {isLoading ? (
                    <LoadingSpinner
                        size={16}
                        context={variant === 'filled' ? 'inverted' : context}
                    />
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
