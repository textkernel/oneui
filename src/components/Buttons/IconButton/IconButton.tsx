import * as React from 'react';
import { bem } from '../../../utils';
import { ButtonContext, ButtonType, ButtonVariant, Size } from '../../../constants';
import { Button } from '../Button';
import styles from './IconButton.scss';
import { LoadingSpinner } from '../../LoadingSpinner';

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The icon of the Button */
    children: React.ReactElement;
    /** The size of the button */
    size?: Size;
    /** Define the button variant, eg. filled, outlined  */
    variant?: ButtonVariant;
    /** Define the button context, eg. primary, secondary, critical */
    context?: ButtonContext;
    /** Whether or not to show the button in loading state */
    isLoading?: boolean;
    /** Providing a href will render an <a> element, styled as a button. */
    href?: string;
    /** Type of the button */
    type?: ButtonType;
}

const { block, elem } = bem('IconButton', styles);

export const IconButton = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            children,
            disabled = false,
            size = 'medium',
            variant = 'filled',
            context = 'secondary',
            isLoading = false,
            type = 'button',
            href,
            ...rest
        },
        ref
    ) => {
        const icon = React.cloneElement(
            isLoading ? (
                <LoadingSpinner context={variant === 'filled' ? 'inverted' : context} />
            ) : (
                children
            ),
            {
                size,
                ...elem('icon', {
                    size,
                }),
            }
        );

        return (
            <Button
                ref={ref}
                disabled={disabled}
                size={size}
                variant={variant}
                context={context}
                href={href}
                type={type}
                {...rest}
                {...block({ size })}
                isLoading={false}
            >
                {icon}
            </Button>
        );
    }
);

IconButton.displayName = 'IconButton';
