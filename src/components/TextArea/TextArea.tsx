import React, { forwardRef } from 'react';
import { bem } from '../../utils';
import styles from './TextArea.scss';
import { Size } from '../../constants';

export interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Should the input field be disabled or not */
    disabled?: boolean;
    /** Whether or not to show block-level textarea (full width) */
    isBlock?: boolean;
    /** The size of the textarea */
    size?: Size;
}

const { block } = bem('TextArea', styles);

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
    ({ disabled = false, isBlock = false, size = 'normal', ...rest }, ref) => (
        <textarea {...rest} {...block({ ...rest, size, isBlock })} ref={ref} disabled={disabled} />
    )
);

TextArea.displayName = 'TextArea';
