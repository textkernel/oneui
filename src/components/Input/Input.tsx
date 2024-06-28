import * as React from 'react';
import { bem } from '../../utils';
import styles from './Input.scss';
import { ValidationContext, InputType, Size } from '../../constants';

// Any other attributes (onChange, onKeyUp etc.) are
// supported although not defined in props type definition
export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The input field context (e.g. brand, critical, success etc. - defaults to brand) */
    context?: ValidationContext;
    /** Should the input field be disabled or not */
    disabled?: boolean;
    /** Whether or not to show block-level input field (full width) */
    isBlock?: boolean;
    /** The size of the input field */
    size?: Size;
    /** Type of the input field */
    type?: InputType;
}

const { block } = bem('Input', styles);

export const Input = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            children,
            context,
            disabled = false,
            isBlock = false,
            size = 'normal',
            type = 'text',
            value,
            ...rest
        },
        ref
    ) => {
        const isLastPassDisabled = type !== 'password';
        return (
            <input
                {...rest}
                {...block({ context, size, isBlock, disabled, ...rest })}
                ref={ref}
                type={type}
                disabled={disabled}
                value={value}
                data-lpignore={isLastPassDisabled}
            />
        );
    }
);

Input.displayName = 'Input';
