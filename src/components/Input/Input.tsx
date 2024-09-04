import * as React from 'react';
import Error from '@material-design-icons/svg/round/error.svg';
import { bem } from '../../utils';
import styles from './Input.scss';
import { InputType } from '../../constants';

type FieldSize = 'small' | 'medium';

type ErrorContext = 'critical';

// Any other attributes (onChange, onKeyUp etc.) are
// supported although not defined in props type definition
export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The input error field context (critical) */
    context?: ErrorContext;
    /** Should the input field be disabled or not */
    disabled?: boolean;
    /** Should the input field be readOnly or not */
    readOnly?: boolean;
    /** Whether or not to show block-level input field (full width) */
    isBlock?: boolean;
    /** The size of the input field */
    size?: FieldSize;
    /** Type of the input field */
    type?: InputType;
    /** Field label */
    label?: string;
    /** Helper text under the field, display the error when the context is critical */
    helperText?: string;
}

const { block, elem } = bem('Input', styles);

export const Input = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            children,
            context,
            disabled = false,
            readOnly = false,
            isBlock = false,
            size = 'medium',
            type = 'text',
            value,
            label,
            helperText,
            ...rest
        },
        ref
    ) => {
        const [isActive, setIsActive] = React.useState(false);

        const isLastPassDisabled = type !== 'password';

        const handleInput = (event) => {
            setIsActive(event.target.value.length > 0);
        };

        const handleOnBlur = () => {
            setIsActive(false);
        };

        return (
            <>
                <label {...elem('label')} htmlFor="input-field">
                    {label}
                </label>
                <input
                    {...rest}
                    {...block({ context, size, isBlock, disabled, isActive, ...rest })}
                    id="input-field"
                    ref={ref}
                    type={type}
                    disabled={disabled}
                    readOnly={readOnly}
                    value={value}
                    onInput={handleInput}
                    onBlur={handleOnBlur}
                    data-lpignore={isLastPassDisabled}
                />

                {helperText && (
                    <div {...elem('helperTextWrapper')}>
                        {context && <Error viewBox="0 0 24 24" {...elem('icon')} />}
                        <p {...elem('helperText', { context })}>{helperText}</p>
                    </div>
                )}
            </>
        );
    }
);

Input.displayName = 'Input';
