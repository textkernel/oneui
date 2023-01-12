import React, { forwardRef } from 'react';
import { bem } from '../../../utils';
import styles from './Button.scss';
import { ButtonType, Context, Size } from '../../../constants';
import { NotEmptySingleReactNode } from '../../../customTypes/types';

export interface Props
    extends Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement> &
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'size'
    > {
    /** The label of the button */
    children: NotEmptySingleReactNode;
    /** The button context (e.g. brand, primary, bad, good etc. - defaults to neutral) */
    context?: Context | 'link';
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
    /** Providing an href will render an <a> element, styled as a button. */
    href?: string;
}

const { block } = bem('Button', styles);

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
    (
        {
            children,
            context = 'neutral',
            disabled = false,
            isBlock = false,
            isInline = false,
            isLoading = false,
            type = 'button',
            href,
            size = 'normal',
            ...rest
        },
        ref
    ) => {
        if (href) {
            return (
                <a
                    {...rest}
                    {...block({ context, isBlock, isInline, isLoading, size, ...rest })}
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
                {...block({ context, isBlock, isInline, isLoading, size, ...rest })}
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
