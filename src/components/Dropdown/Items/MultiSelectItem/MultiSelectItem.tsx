/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
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
import { stopPropagation } from '../../../../utils/misc';

export interface Props<PriorityItemValue> extends DropdownMenuCheckboxItemProps {
    /** Id for the checkbox */
    id?: string;
    /** a variant to determine the look and feel of component */
    variant?: 'option' | 'select-all' | 'group-title';
    /** props for PrioritySelector  */
    priority?: PrioritySelectorProps<PriorityItemValue>;
    /** Checkbox status */
    isSelected?: boolean;
}

const { block } = bem('MultiSelectItem', styles);

export const MultiSelectItem = React.forwardRef(
    <PriorityItemValue extends unknown>(
        {
            children,
            isSelected = false,
            disabled = false,
            variant = 'option',
            onCheckedChange,
            priority,
            ...rest
        }: Props<PriorityItemValue>,
        ref: React.Ref<HTMLDivElement>
    ) => {
        const priorityRef = React.useRef<HTMLDivElement>(null);

        const hasPriorityList = priority && priority.list.length > 0;

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (e.key === 'Tab' && !e.shiftKey) {
                if (priorityRef.current) {
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
                        <PrioritySelector {...priority} buttonRef={priorityRef} />
                    </div>
                )}
                <Text inline>{children}</Text>
            </DropdownMenuCheckboxItem>
        );
    }
) as <PriorityItemValue extends unknown>(
    p: Props<PriorityItemValue> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;
