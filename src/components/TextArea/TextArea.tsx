import React, { forwardRef } from 'react';
import CopyAll from '@material-design-icons/svg/round/copy_all.svg';
import Error from '@material-design-icons/svg/round/error.svg';
import { bem } from '../../utils';
import { Text } from '../Text/Text';
import { IconButton } from '../Buttons';
import styles from './TextArea.scss';

export interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Should the input field be disabled or not */
    disabled?: boolean;
    /** Should the input field be readOnly or not */
    readOnly?: boolean;
    /** Label text, displayey above the textarea */
    label: string;
    /** Label status, eg. required or optional, rendered between parenthesis */
    labelStatus?: string;
    /** Textarea maximum number of characters allowed */
    maxLength?: number;
    /** Helper text, displayed below the textarea */
    helperText?: string;
    /** Error text, displayed below the textarea */
    errorText?: string;
    /** Callback executed after clicking on Copy button */
    copyCallback?: (text: string) => void;
}

const { block, elem } = bem('TextArea', styles);

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
    (
        {
            disabled = false,
            readOnly = false,
            maxLength = 240,
            label,
            labelStatus,
            helperText,
            errorText,
            defaultValue,
            value,
            copyCallback,
            onChange,
            ...rest
        },
        ref
    ) => {
        const [text, setText] = React.useState((defaultValue ?? value ?? '').toString());

        const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setText(e.target.value);
            onChange?.(e);
        };

        const handleOnCopy = () => {
            navigator.clipboard.writeText(text);
            copyCallback?.(text);
        };

        return (
            <div {...block({ ...rest })}>
                <div {...elem('labelRow')}>
                    <div>
                        <Text inline {...elem('label')}>
                            {label}
                        </Text>
                        {labelStatus && (
                            <Text inline {...elem('labelStatus')}>
                                ({labelStatus})
                            </Text>
                        )}
                    </div>
                    <Text inline {...elem('letterCount')}>
                        {text.length} / {maxLength}
                    </Text>
                </div>
                <div {...elem('container')}>
                    <textarea
                        {...rest}
                        {...elem('textarea', { ...rest })}
                        ref={ref}
                        value={value}
                        defaultValue={defaultValue}
                        maxLength={maxLength}
                        disabled={disabled}
                        readOnly={readOnly}
                        aria-invalid={!!errorText}
                        onChange={handleOnChange}
                    />
                    {copyCallback && (
                        <div {...elem('iconContainer')}>
                            <IconButton onClick={handleOnCopy} variant="ghost" size="large">
                                <CopyAll viewBox="0 0 24 24" {...elem('icon')} />
                            </IconButton>
                        </div>
                    )}
                </div>
                {errorText && !helperText && (
                    <div {...elem('errorContainer')}>
                        <Error viewBox="0 0 24 24" fill="currentColor" {...elem('icon')} />
                        <Text inline {...elem('errorText')}>
                            {errorText}
                        </Text>
                    </div>
                )}
                {helperText && !errorText && (
                    <Text inline {...elem('helperText')}>
                        {helperText}
                    </Text>
                )}
            </div>
        );
    }
);

TextArea.displayName = 'TextArea';
