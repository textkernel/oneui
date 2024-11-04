import React from 'react';
import {
    DropdownMenuCheckboxItem,
    DropdownMenuCheckboxItemProps,
} from '@radix-ui/react-dropdown-menu';
import { PrioritySelector, PrioritySelectorProps } from '../../../PrioritySelector';
import { bem } from '../../../../utils';
import { VisualCheckbox } from '../../../Checkbox';
import { Text } from '../../../Text';
import styles from './MultiSelectItem.scss';

export interface Props<PriorityItemValue> extends DropdownMenuCheckboxItemProps {
    /** Id for the checkbox */
    id?: string;
    /** a variant to determine the look and feel of component */
    variant?: 'option' | 'select-all' | 'group-title';
    /** to add a priority badge before the label */
    hasPriority?: boolean;
    /** props for PrioritySelector  */
    priority?: PrioritySelectorProps<PriorityItemValue>;
    /** Checkbox status */
    isSelected?: boolean;
}

const { block } = bem('MultiSelectItem', styles);

export const MultiSelectItem = React.forwardRef<HTMLLIElement, Props<string>>(
    (
        {
            children,
            isSelected = false,
            disabled = false,
            variant = 'option',
            hasPriority = false,
            onCheckedChange,
            priority,
            ...rest
        },
        ref
    ) => {
        const priorityRef = React.useRef<HTMLDivElement>(null);

        const hasPriorityList = hasPriority && priority && priority.list.length > 0;

        const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
            e.stopPropagation(); // Prevents the checkbox from toggling
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
            <DropdownMenuCheckboxItem
                ref={ref}
                role="option"
                aria-selected={isSelected}
                onKeyDown={handleKeyDown}
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
                <Text inline>{children}</Text>
            </DropdownMenuCheckboxItem>
        );
    }
);
