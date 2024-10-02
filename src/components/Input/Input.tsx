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
    /** Icon before input, optional */
    leadingIcon?: { icon: React.ReactElement; callback?: () => void };
    /** Icon after input, which can trigger callback as a button, optional */
    trailingIcon?: { icon: React.ReactElement; callback?: () => void };
    /**  Controls whether space is reserved for error messages under the input field when validation is expected
     *  to avoid "jumping" UI. */
    reserveErrorMessageSpace?: boolean;
}

export type Props = BaseProps & (ErrorStateProps | { context?: undefined; errorMessage?: never });

const { block, elem } = bem('Input', styles);

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
            value,
            label,
            helperText,
            leadingIcon,
            trailingIcon,
            errorMessage,
            reserveErrorMessageSpace = false,
            ...rest
        },
        ref
    ) => {
        const fallbackId = React.useId();
        const idRef = id || fallbackId;
        const [hasText, setHasText] = React.useState<boolean>(!!value);

        React.useEffect(() => {
            setHasText(!!value);
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setHasText(!!e.target.value);
            if (rest.onChange) {
                rest.onChange(e);
            }
        };

        const isLastPassDisabled = type !== 'password';

        return (
            <div
                {...block({
                    withIcon: leadingIcon,
                    context,
                    size,
                    isBlock,
                    disabled,
                    readOnly,
                })}
            >
                {label && (
                    <label {...elem('label')} htmlFor={idRef}>
                        {label}
                    </label>
                )}
                <div
                    data-testid="inputContainer"
                    {...elem('inputContainer', {
                        context,
                        size,
                        isBlock,
                        disabled,
                        type,
                        readOnly,
                    })}
                >
                    {leadingIcon &&
                        React.cloneElement(leadingIcon.icon, {
                            viewBox: '0 0 24 24',
                            ...elem('icon', { type: 'leading', bold: hasText, size }),
                            onClick: leadingIcon.callback ? leadingIcon.callback : undefined,
                        })}
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
                    {trailingIcon &&
                        React.cloneElement(trailingIcon.icon, {
                            viewBox: '0 0 24 24',
                            ...elem('icon', { type: 'trailing', visible: hasText, size }),
                            onClick: trailingIcon.callback ? trailingIcon.callback : undefined,
                        })}
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
            </div>
        );
    }
);

Input.displayName = 'Input';
