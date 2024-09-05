import * as React from 'react';
import Error from '@material-design-icons/svg/round/error.svg';
import { bem } from '../../utils';
import styles from './Input.scss';
import { InputType } from '../../constants';

type InputSize = 'small' | 'medium';

type ErrorContext = 'critical';

type ErrorStateProps = {
    /** The input error field context (critical) */
    context: ErrorContext;
    /** This message will be rendered under the input when context critical will be applied */
    errorMessage: string;
};

interface BaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Should the input field be disabled or not */
    disabled?: boolean;
    /** Should the input field be readOnly or not */
    readOnly?: boolean;
    /** Whether or not to show block-level input field (full width) */
    isBlock?: boolean;
    /** The size of the input field */
    size?: InputSize;
    /** Type of the input field */
    type?: InputType;
    /** Field label */
    label?: string;
    /** Helper text under the input, display the error when the context is critical */
    helperText?: string;
}

export type Props = BaseProps & (ErrorStateProps | { context?: undefined; errorMessage?: never });

const { block, elem } = bem('Input', styles);

export const Input = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            children,
            context = undefined,
            disabled = false,
            readOnly = false,
            isBlock = false,
            size = 'medium',
            type = 'text',
            value,
            label,
            helperText,
            errorMessage,
            ...rest
        },
        ref
    ) => {
        const [isActive, setIsActive] = React.useState(false);

        const idRef = React.useId();

        const isLastPassDisabled = type !== 'password';

        const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsActive(event.target.value.length > 0);
        };

        const handleOnBlur = () => {
            setIsActive(false);
        };

        return (
            <>
                {label && (
                    <label {...elem('label')} htmlFor={idRef}>
                        {label}
                    </label>
                )}
                <input
                    {...rest}
                    {...block({ context, size, isBlock, disabled, isActive, ...rest })}
                    id={idRef}
                    ref={ref}
                    type={type}
                    disabled={disabled}
                    readOnly={readOnly}
                    value={value}
                    onInput={handleInput}
                    onBlur={handleOnBlur}
                    aria-invalid={context === 'critical' ? 'true' : undefined}
                    data-lpignore={isLastPassDisabled}
                />
                {context === 'critical' && errorMessage ? (
                    <div {...elem('errorMessageWrapper')}>
                        <Error viewBox="0 0 24 24" {...elem('icon')} />
                        <p {...elem('errorMessage', { context })}>{errorMessage}</p>
                    </div>
                ) : (
                    helperText && <p {...elem('helperText')}>{helperText}</p>
                )}
            </>
        );
    }
);

Input.displayName = 'Input';
