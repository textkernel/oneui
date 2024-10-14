import React from 'react';
import {
    DropdownMenuCheckboxItem,
    DropdownMenuCheckboxItemProps,
} from '@radix-ui/react-dropdown-menu';
import { bem } from '../../utils';
import { FakeCheckbox } from '../Checkbox/FakeCheckbox';
import { Text } from '../Text';
import styles from './MultiSelectMenuItem.scss';

export interface Props extends Omit<DropdownMenuCheckboxItemProps, 'onChange'> {
    /** A function to be called if the item is clicked */
    onChange?: (e: React.SyntheticEvent<HTMLInputElement | HTMLLIElement>) => void;
    /** Id for the checkbox */
    id?: string;
    /** a variant to determine the look and feel of component */
    variant?: 'option' | 'select-all' | 'group-title';
    /** to add a priority badge before the label */
    hasPriority?: boolean;
    isSelected?: boolean;
    isHighlighted?: boolean;
}

const { block } = bem('MultiSelectMenuItem', styles);

export const MultiSelectMenuItem = React.forwardRef<HTMLLIElement, Props>(
    (
        {
            children,
            isSelected = false,
            isHighlighted = false,
            disabled = false,
            variant = 'option',
            hasPriority = false, // eslint-disable-line @typescript-eslint/no-unused-vars
            ...rest
        },
        ref
    ) => (
        <DropdownMenuCheckboxItem
            ref={ref}
            role="option"
            aria-selected={isSelected}
            tabIndex={disabled ? -1 : 0}
            onSelect={(e) => {
                e.preventDefault();
            }}
            {...rest}
            {...block({
                isHighlighted,
                isSelected,
                disabled,
                variant,
                ...rest,
            })}
        >
            <FakeCheckbox checked={isSelected} />
            <Text inline>{children}</Text>
        </DropdownMenuCheckboxItem>
    )
);

MultiSelectMenuItem.displayName = 'MultiSelectMenuItem';
