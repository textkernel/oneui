import * as React from 'react';
import { bem } from '../../../utils';
import styles from './FileButton.scss';
import { OldSize as Size } from '../../../constants';

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The label of the button */
    children: React.ReactNode;
    /** The size of the button */
    size?: Size;
    /** Whether or not to show block-level button (full width) */
    isBlock?: boolean;
    /** Should button be disabled or not */
    disabled?: boolean;
}

const { block } = bem('Button', styles);

export const FileButton = React.forwardRef<HTMLInputElement, Props>(
    ({ children, disabled = false, isBlock = false, size = 'normal', ...rest }, ref) => {
        if (typeof children !== 'number' && !children) {
            return null;
        }

        return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label ref={ref} {...block({ size, isBlock, ...rest })} disabled={disabled}>
                <input {...rest} hidden type="file" />
                {children}
            </label>
        );
    }
);

FileButton.displayName = 'FileButton';
