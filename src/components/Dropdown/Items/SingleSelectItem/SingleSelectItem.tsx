import React from 'react';
import { DropdownMenuItem, DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { PrioritySelector, PrioritySelectorProps } from '../../../PrioritySelector';
import { bem } from '../../../../utils';
import styles from '../Item.scss';

export interface Props<PriorityItemValue> extends Omit<DropdownMenuItemProps, 'onSelect'> {
    /** A function to be called if the item is clicked */
    onSelect?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
    /** Id for the checkbox */
    id?: string;
    /** Checkbox status */
    isSelected?: boolean;
    /** Should PrioritySelector be included */
    hasPriority?: boolean;
    /** props for PrioritySelector */
    priority?: PrioritySelectorProps<PriorityItemValue>;
}

const { block } = bem('DropdownItem', styles);

export const SingleSelectItem = React.forwardRef<HTMLDivElement, Props<string>>(
    (
        { children, isSelected = false, disabled = false, hasPriority = false, priority, ...rest },
        ref
    ) => {
        const hasPriorityList = hasPriority && priority && priority.list.length > 0;
        const priorityRef = React.useRef<HTMLDivElement>(null);

        const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
            e.stopPropagation(); // Prevents the menu from closing
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Tab') {
                if (priorityRef.current) {
                    e.preventDefault();
                    priorityRef.current.focus();
                }
            }
        };

        return (
            <DropdownMenuItem
                ref={ref}
                role="option"
                aria-selected={isSelected}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
                {...rest}
                {...block({
                    isSelected,
                    disabled,
                    ...rest,
                })}
            >
                {hasPriorityList && (
                    <div role="none" onClick={stopPropagation} onKeyDown={stopPropagation}>
                        <PrioritySelector
                            list={priority.list}
                            selectedItem={priority.selectedItem}
                            onSelect={priority.onSelect}
                            buttonRef={priorityRef}
                        />
                    </div>
                )}
                {children}
            </DropdownMenuItem>
        );
    }
);
