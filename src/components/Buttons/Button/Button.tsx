import React, { forwardRef } from 'react';
import { bem } from '../../../utils';
import styles from './Button.scss';
import { ButtonType, Size } from '../../../constants';

export interface Props
    extends Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement> &
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'size'
    > {
    /** The label of the button */
    children: React.ReactNode;
    /** Should the button be in link style or not */
    isLink?: boolean;
    /** Should the button be in primary style or not */
    isPrimary?: boolean;
    /** The size of the button */
    size?: Size;
    /** Whether or not to show block-level button (full width) */
    isBlock?: boolean;
    /** Whether or not to show inline button (without padding) */
    isInline?: boolean;
    /** Whether or not to show the button in loading state */
    isLoading?: boolean;
    /** Should button be disabled or not */
    disabled?: boolean;
    /** Type of the button */
    type?: ButtonType;
    /** Providing a href will render an <a> element, styled as a button. */
    href?: string;
}

const { block } = bem('Button', styles);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
    (
        {
            children,
            disabled = false,
            isBlock = false,
            isInline = false,
            isLoading = false,
            isLink = false,
            isPrimary = false,
            type = 'button',
            href,
            size = 'normal',
            ...rest
        },
        ref
    ) => {
        if (typeof children !== 'number' && !children) {
            return null;
        }

        if (href) {
            return (
                <a
                    {...rest}
                    {...block({ isLink, isPrimary, isBlock, isInline, isLoading, size, ...rest })}
                    ref={ref}
                    href={href}
                >
                    {children}
                </a>
            );
        }

        return (
            <button
                {...rest}
                {...block({ isLink, isPrimary, isBlock, isInline, isLoading, size, ...rest })}
                ref={ref}
                type={type}
                disabled={disabled}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
