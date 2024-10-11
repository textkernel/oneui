import React from 'react';
import { DropdownMenuItem, DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { bem } from '../../../../utils';
import { Text } from '../../../Text';
import styles from '../Item.scss';

export interface Props extends Omit<DropdownMenuItemProps, 'onSelect'> {
    /** A function to be called if the item is clicked */
    onSelect?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
    /** Id for the checkbox */
    id?: string;
    /** to add a priority badge before the label */
    hasPriority?: boolean;
    /** Checkbox status */
    isSelected?: boolean;
}

const { block } = bem('DropdownItem', styles);

export const SingleSelectItem = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            isSelected = false,
            disabled = false,
            hasPriority = false, // eslint-disable-line @typescript-eslint/no-unused-vars
            ...rest
        },
        ref
    ) => (
        <DropdownMenuItem
            ref={ref}
            role="option"
            aria-selected={isSelected}
            tabIndex={disabled ? -1 : 0}
            {...rest}
            {...block({
                isSelected,
                disabled,
                ...rest,
            })}
        >
            <Text inline>{children}</Text>
        </DropdownMenuItem>
    )
);

SingleSelectItem.displayName = 'SingleSelectItem';
