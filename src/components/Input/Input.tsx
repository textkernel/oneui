import * as React from 'react';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './Input.scss';
import { ValidationContext, InputType, Size } from '../../constants';

// Any other attributes (onChange, onKeyUp etc.) are
// supported although not defined in props type definition
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The input field context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context?: ValidationContext;
    /** Label text for the input */
    labelText?: string;
    /** Label text class name */
    labelClassName?: string;
    /** Should the input field be disabled or not */
    disabled?: boolean;
    /** Whether or not to show block-level input field (full width) */
    isBlock?: boolean;
    /** The size of the input field */
    size?: Size;
    /** Type of the input field */
    type?: InputType;
    /** Ref to access the input field */
    ref?: React.RefObject<HTMLInputElement>;
}

const { elem } = bem('Input', styles);

export const Input: React.FC<Props> = React.forwardRef((props, ref) => {
    const {
        children,
        context,
        disabled,
        isBlock,
        size,
        type,
        value,
        labelText,
        labelClassName,
        ...rest
    } = props;
    return (
        <div>
            {labelText && (
                <Text {...elem('label', { elemClassName: labelClassName })}>{labelText}</Text>
            )}
            <input
                {...rest}
                {...elem('field', props)}
                ref={ref}
                type={type}
                disabled={disabled}
                value={value}
            />
        </div>
    );
});

Input.displayName = 'Input';

Input.defaultProps = {
    disabled: false,
    isBlock: false,
    type: 'text',
    size: 'normal',
};
