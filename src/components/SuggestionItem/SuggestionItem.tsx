import { bem } from '@textkernel/oneui/utils';
import React, { useId } from 'react';
import styles from './SuggestionItem.scss';
import { Checkbox } from '../Checkbox';

const { block, elem } = bem('SuggestionItem', styles);

export interface Props {
    /** Disable state */
    isDisabled?: boolean;
    /** Selected state */
    isSelected?: boolean;
    /** Add a checkbox to the item */
    hasCheckbox: boolean;
    /** A function to be called when the button is clicked */
    onClick: () => void;
    /** A function to be called when the checkbox checked status changes */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** Content */
    children: React.ReactNode;
}

export function SuggestionItem({
    isDisabled = false,
    isSelected = false,
    hasCheckbox = true,
    onClick,
    onChange,
    children,
}: Props) {
    const id = useId();

    return (
        <li>
            <button onClick={onClick} disabled={isDisabled} {...block({ isSelected, isDisabled })}>
                {hasCheckbox ? (
                    <Checkbox
                        id={id}
                        checked={isSelected}
                        disabled={isDisabled}
                        onChange={onChange}
                        {...elem('checkbox', { isDisabled })}
                    >
                        <>{children}</>
                    </Checkbox>
                ) : (
                    children
                )}
            </button>
        </li>
    );
}
