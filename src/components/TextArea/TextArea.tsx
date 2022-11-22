import React, { forwardRef } from 'react';
import { bem } from '../../utils';
import styles from './TextArea.scss';
import { Context, Size } from '../../constants';

export interface Props extends React.HTMLAttributes<HTMLElement> {
    /** The textarea context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context?: Context;
    /** Should the input field be disabled or not */
    disabled?: boolean;
    /** Whether or not to show block-level textarea (full width) */
    isBlock?: boolean;
    /** The size of the textarea */
    size?: Size;
}

const { block } = bem('TextArea', styles);

export const TextArea = forwardRef<HTMLElement, Props>(
    ({ context = 'brand', disabled = false, isBlock = false, size = 'normal', ...rest }, ref) => {
        return (
            <textarea
                {...rest}
                {...block({ ...rest, context, size, isBlock })}
                ref={ref}
                disabled={disabled}
            />
        );
    }
);

TextArea.displayName = 'TextArea';
