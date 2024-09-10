import React, { useId } from 'react';
import { bem } from '../../utils';
import { Checkbox } from '../Checkbox';
import styles from './SuggestionItem.scss';

export interface Props {
    /** Disable state */
    isDisabled?: boolean;
    /** Selected state */
    isSelected?: boolean;
    /** Add a checkbox to the item */
    hasCheckbox?: boolean;
    /** A function to be called when the button is clicked */
    onClick: () => void;
    /** A function to be called when the checkbox checked status changes */
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /** Content */
    children: React.ReactNode;
}

const { block, elem } = bem('SuggestionItem', styles);

export function SuggestionItem({
    isDisabled = false,
    isSelected = false,
    hasCheckbox = false,
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
