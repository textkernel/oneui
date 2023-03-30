import * as React from 'react';
import { bem } from '../../../utils';
import styles from './FileButton.scss';
import { Context, Size } from '../../../constants';
import { NotEmptySingleReactNode } from '../../../customTypes/types';

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The label of the button */
    children: NotEmptySingleReactNode;
    /** The button context (e.g. info, danger, success etc. - defaults to neutral) */
    context?: Context | 'link';
    /** The size of the button */
    size?: Size;
    /** Whether or not to show block-level button (full width) */
    isBlock?: boolean;
    /** Whether or not to show inline button (without padding) */
    isInline?: boolean;
    /** Should button be disabled or not */
    disabled?: boolean;
}

const { block } = bem('Button', styles);

export const FileButton = React.forwardRef<HTMLInputElement, Props>(
    (
        {
            children,
            context = 'neutral',
            disabled = false,
            isBlock = false,
            isInline = false,
            size = 'normal',
            ...rest
        },
        ref
    ) => {
        return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
                ref={ref}
                {...block({ context, size, isBlock, isInline, ...rest })}
                disabled={disabled}
            >
                <input {...rest} hidden type="file" />
                {children}
            </label>
        );
    }
);

FileButton.displayName = 'FileButton';
