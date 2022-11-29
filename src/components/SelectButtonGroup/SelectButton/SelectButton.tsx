import * as React from 'react';
import { bem } from '../../../utils';
import { ENTER_KEY, Context, Size } from '../../../constants';
import styles from './SelectButton.scss';

// These props will be passed by the parent <SelectButtonGroup>
interface InternalProps<V> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** A function to be called if a button is pressed. */
    onChange?: (value: V) => void;
    /** If this component a child of a full block with container  */
    isBlock?: boolean;
    /** If this button has same width as its siblings */
    isEqualWidth?: boolean;
}

export interface Props<V> extends InternalProps<V> {
    /** the label to be displayed on this button */
    children: NotEmptyReactNode;
    /** the value associated with this button */
    value: V;
    /** whether or not this button is selected */
    isSelected?: boolean;
    /** the color context to be applied in the selected state */
    context?: Context | 'primary';
    /** size of the button */
    size?: Size;
}

const { block } = bem('SelectButton', styles);

export function SelectButton<V>({
    children,
    value,
    onChange,
    isEqualWidth = false,
    isBlock,
    context = 'primary',
    isSelected = false,
    size = 'normal',
    ...rest
}: Props<V>) {
    const handleClick = () => {
        if (onChange) {
            onChange(value);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ENTER_KEY) {
            handleClick();
        }
    };

    return (
        <div
            role="button"
            tabIndex={0}
            {...rest}
            onKeyPress={handleKeyPress}
            onClick={handleClick}
            {...block({ isEqualWidth, context, isSelected, size, ...rest })}
        >
            {children}
        </div>
    );
}

SelectButton.displayName = 'SelectButton';
