import * as React from 'react';
import { bem } from '../../../utils';
import styles from './FileButton.scss';
import { Context, Size } from '../../../constants';

export interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** The label of the button */
    children: NotEmptySingleReactNode;
    /** The button context (e.g. brand, primary, bad, good etc. - defaults to neutral) */
    context?: Context | 'link';
    /** The size of the button */
    size?: Size;
    /** Whether or not to show block-level button (full width) */
    isBlock?: boolean;
    /** Whether or not to show inline button (without padding) */
    isInline?: boolean;
    /** Should button be disabled or not */
    disabled?: boolean;
    /** Ref to access the button */
    ref?: React.ForwardedRef<HTMLInputElement>;
}

const { block } = bem('Button', styles);

export const FileButton: React.FC<Props> = React.forwardRef((props, ref) => {
    const { children, context, disabled, isBlock, isInline, size, ...rest } = props;

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label ref={ref} {...block(props)} disabled={disabled}>
            <input {...rest} hidden type="file" />
            {children}
        </label>
    );
});

FileButton.displayName = 'FileButton';

FileButton.defaultProps = {
    context: 'neutral',
    size: 'normal',
    isBlock: false,
    isInline: false,
    disabled: false,
};
