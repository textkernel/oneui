import * as React from 'react';
import bem from '../../utils/bem';
import styles from './Input.scss';
import { Context, InputType, Size } from '../../constants';

// Any other attributes (onChange, onKeyUp etc.) are
// supported although not defined in props type definition
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The input field context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: Context;
    /** Should the input field be disabled or not */
    disabled: boolean;
    /** Whether or not to show block-level input field (full width) */
    isBlock: boolean;
    /** The size of the input field */
    size: Size;
    /** Type of the input field */
    type: InputType;
}

const { block } = bem('Input', styles);

const Input: React.FC<Props> = React.forwardRef((props, ref?: React.Ref<HTMLInputElement>) => {
    const { children, context, disabled, isBlock, size, type, value, ...rest } = props;
    return (
        <input
            {...rest}
            {...block(props)}
            ref={ref}
            type={type}
            disabled={disabled}
            value={value}
        />
    );
});

Input.displayName = 'Input';

Input.defaultProps = {
    context: 'brand',
    disabled: false,
    isBlock: false,
    type: 'text',
    size: 'normal',
};

export default Input;
