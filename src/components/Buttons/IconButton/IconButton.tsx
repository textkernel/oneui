import * as React from 'react';
import { bem } from '../../../utils';
import { Button, ButtonProps } from '../Button';
import { LoadingSpinner } from '../../LoadingSpinner';
import styles from './IconButton.scss';

export interface Props extends Omit<ButtonProps, 'children'> {
    /** The icon of the button */
    children: React.ReactElement;
}

const { block, elem } = bem('IconButton', styles);

export const IconButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
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
                {...block({ size, ...rest })}
                isLoading={false}
            >
                {icon}
            </Button>
        );
    }
);

IconButton.displayName = 'IconButton';
