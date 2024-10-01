import * as React from 'react';
import Error from '@material-design-icons/svg/round/error.svg';
import Search from '@material-design-icons/svg/round/search.svg';
import Clear from '@material-design-icons/svg/round/cancel.svg';
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
    /** */
    leadingIcon?: boolean;
    /** */
    deleteButton?: boolean;
    /** */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /**  Controls whether space is reserved for error messages under the input field when validation is expected
     *  to avoid "jumping" UI. */
    reserveErrorMessageSpace?: boolean;
}

export type Props = BaseProps &
    (ErrorStateProps | { context?: undefined | string; errorMessage?: never });

const { block, elem } = bem('InputContainer', styles);

export const Input = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            id,
            children,
            context = undefined,
            disabled = false,
            readOnly = false,
            isBlock = false,
            size = 'medium',
            type = 'text',
            value: initialValue = '',
            label,
            helperText,
            leadingIcon = false,
            deleteButton = false,
            errorMessage,
            reserveErrorMessageSpace = false,
            ...rest
        },
        ref
    ) => {
        const fallbackId = React.useId();
        const idRef = id || fallbackId;
        const [value, setValue] = React.useState(initialValue);
        const [hasText, setHasText] = React.useState<boolean>(!!initialValue);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            setHasText(!!e.target.value);
            if (rest.onChange) {
                rest.onChange(e);
            }
        };

        React.useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);

        // Function to clear the input value
        const handleClear = () => {
            setValue('');
            setHasText(false);
        };

        const isLastPassDisabled = type !== 'password';

        return (
            <>
                {label && (
                    <label {...elem('label')} htmlFor={idRef}>
                        {label}
                    </label>
                )}
                <div
                    data-testid="inputContainer"
                    {...block({
                        withIcon: leadingIcon,
                        context,
                        size,
                        isBlock,
                        disabled,
                        readOnly,
                    })}
                >
                    {leadingIcon && (
                        <Search
                            {...elem('icon', { type: 'search', bold: hasText, size })}
                            viewBox="0 0 24 24"
                        />
                    )}
                    <input
                        {...rest}
                        {...elem('input', { context, size, isBlock, disabled, type })}
                        id={idRef}
                        ref={ref}
                        type={type}
                        disabled={disabled}
                        readOnly={readOnly}
                        value={value}
                        onChange={handleChange}
                        aria-invalid={context === 'critical' ? 'true' : undefined}
                        data-lpignore={isLastPassDisabled}
                    />
                    {deleteButton && (
                        <Clear
                            {...elem('icon', { type: 'clear', visible: hasText, size })}
                            viewBox="0 0 24 24"
                            onClick={handleClear}
                        />
                    )}
                </div>

                {(context === 'critical' && errorMessage) ||
                (reserveErrorMessageSpace && !helperText) ? (
                    <div {...elem('errorMessageWrapper', { reserveErrorMessageSpace })}>
                        <Error
                            viewBox="0 0 24 24"
                            {...elem('icon', { context, reserveErrorMessageSpace })}
                        />
                        <p
                            {...elem('errorMessage', {
                                context,
                                reserveErrorMessageSpace,
                            })}
                        >
                            {errorMessage}
                        </p>
                    </div>
                ) : (
                    helperText && <p {...elem('helperText')}>{helperText}</p>
                )}
            </>
        );
    }
);

Input.displayName = 'Input';
