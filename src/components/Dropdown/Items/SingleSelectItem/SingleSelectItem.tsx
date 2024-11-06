import React from 'react';
import { DropdownMenuItem, DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { PrioritySelector, PrioritySelectorProps } from '../../../PrioritySelector';
import { bem } from '../../../../utils';
import styles from '../Item.scss';
import { stopPropagation } from '../../../../utils/misc';

export interface Props<PriorityItemValue> extends Omit<DropdownMenuItemProps, 'onSelect'> {
    /** A function to be called if the item is clicked */
    onSelect?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
    /** Id for the checkbox */
    id?: string;
    /** Checkbox status */
    isSelected?: boolean;
    /** props for PrioritySelector */
    priority?: PrioritySelectorProps<PriorityItemValue>;
}

const { block } = bem('DropdownItem', styles);

export const SingleSelectItem = React.forwardRef<HTMLDivElement, Props<string>>(
    ({ children, isSelected = false, disabled = false, priority, ...rest }, ref) => {
        const hasPriorityList = priority && priority.list.length > 0;
        const priorityRef = React.useRef<HTMLDivElement>(null);

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Tab' && !e.shiftKey) {
                if (priorityRef.current) {
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
                        <PrioritySelector {...priority} buttonRef={priorityRef} />
                    </div>
                )}
                {children}
            </DropdownMenuItem>
        );
    }
);
