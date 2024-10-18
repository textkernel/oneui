import React from 'react';
import {
    DropdownMenuCheckboxItem,
    DropdownMenuCheckboxItemProps,
} from '@radix-ui/react-dropdown-menu';
import { bem } from '../../../../utils';
import { VisualCheckbox } from '../../../Checkbox';
import { Text } from '../../../Text';
import styles from './MultiSelectItem.scss';

export interface Props extends DropdownMenuCheckboxItemProps {
    /** Id for the checkbox */
    id?: string;
    /** a variant to determine the look and feel of component */
    variant?: 'option' | 'select-all' | 'group-title';
    /** to add a priority badge before the label */
    hasPriority?: boolean;
    /** Checkbox status */
    isSelected?: boolean;
}

const { block } = bem('MultiSelectItem', styles);

export const MultiSelectItem = React.forwardRef<HTMLLIElement, Props>(
    (
        {
            children,
            isSelected = false,
            disabled = false,
            variant = 'option',
            hasPriority = false, // eslint-disable-line @typescript-eslint/no-unused-vars
            onCheckedChange,
            ...rest
        },
        ref
    ) => (
        <DropdownMenuCheckboxItem
            ref={ref}
            role="option"
            aria-selected={isSelected}
            tabIndex={disabled ? -1 : 0}
            checked={isSelected}
            onSelect={(e) => {
                e.preventDefault();
            }}
            onCheckedChange={onCheckedChange}
            {...rest}
            {...block({
                isSelected,
                disabled,
                variant,
                ...rest,
            })}
        >
            <VisualCheckbox checked={isSelected} />
            <Text inline>{children}</Text>
        </DropdownMenuCheckboxItem>
    )
);
