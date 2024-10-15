import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import KeyboardDoubleArrowUp from '@material-design-icons/svg/round/keyboard_double_arrow_up.svg';
import KeyboardArrowUp from '@material-design-icons/svg/round/keyboard_arrow_up.svg';
import KeyboardArrowDown from '@material-design-icons/svg/round/keyboard_arrow_down.svg';

import { EmptyElement } from '@textkernel/oneui/customTypes/types';
import { bem } from '../../utils';
import { Text } from '../Text';
import styles from './SelectedItemBadge.scss';
import {
    DropdownContent,
    DropdownRoot,
    DropdownTrigger,
    SingleSelectItem,
    SingleSelectItemProps,
} from '../Dropdown';

const iconMap = {
    mandatory: KeyboardDoubleArrowUp,
    important: KeyboardArrowUp,
    optional: KeyboardArrowDown,
    exclude: Close,
};

export type Priority = 'mandatory' | 'important' | 'optional' | 'exclude';

export type PriorityItem<PriorityItemValue> = {
    priority: Priority;
    label: string;
    value?: PriorityItemValue;
};

// Priority related props
type PriorityProps<PriorityItemValue> = {
    /** Currently selected priority item that indicates the importance of the component. */
    selectedItem: PriorityItem<PriorityItemValue>;
    /** Array of availible priority items. */
    list: Array<PriorityItem<PriorityItemValue>>;
    /** Callback function triggered when a new priority is selected. */
    onChange: (newPriorityItem: PriorityItem<PriorityItemValue>) => void;
    /** Priority button label name for ARIA labelling */
    buttonLabel: string;
};

export interface Props<PriorityItemValue>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Children nodes to be rendered within the Dropdown,
     *  which is triggered by the main button
     * */
    children?:
        | React.ReactElement
        | React.ReactElement<SingleSelectItemProps>
        | (React.ReactElement<SingleSelectItemProps> | EmptyElement)[]
        | (
              | React.ReactElement<SingleSelectItemProps>
              | React.ReactElement<SingleSelectItemProps>[]
              | EmptyElement
          )[];
    /** Label of the currently selected option item from filter */
    label: React.ReactNode;
    /** An additional label displayed next to the main label (e.g., the number of synonyms) */
    additionalLabel?: React.ReactNode;
    /** Function to be called when the delete button is clicked. */
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** Boolean indicating whether the whole badge should be disabled. */
    isDisabled?: boolean;
    /** Main button label name for ARIA labelling */
    buttonLabel?: string;
    /** Delete button label name for ARIA labelling */
    deleteButtonLabel?: string;
    priority?: PriorityProps<PriorityItemValue>;
}

const { block, elem } = bem('SelectedItemBadge', styles);

export const SelectedItemBadge = React.forwardRef<HTMLDivElement, Props<string>>(
    (
        {
            children,
            label,
            additionalLabel,
            isDisabled = false,
            onDelete,
            buttonLabel,
            deleteButtonLabel,
            priority,
            ...rest
        },
        ref
    ) => {
        const hasPriorityList = priority && priority.list.length > 0;

        const renderPriorityIcon = (priorityType?: Priority, disabled: boolean = false) => {
            if (!priorityType) {
                return null;
            }

            const IconComponent = iconMap[priorityType];
            return IconComponent ? (
                <IconComponent
                    disabled={disabled}
                    viewBox="0 0 24 24"
                    {...elem('icon', { [priorityType]: true })}
                />
            ) : null;
        };

        const handleOnDelete = (e: React.KeyboardEvent | React.MouseEvent) => {
            e.stopPropagation();
            onDelete?.(e);
        };

        return (
            <div {...rest} ref={ref} {...block()}>
                {hasPriorityList && (
                    <DropdownRoot>
                        <DropdownTrigger asChild>
                            <button
                                aria-label={priority.buttonLabel}
                                disabled={isDisabled}
                                type="button"
                                {...elem('priorityButton')}
                            >
                                {renderPriorityIcon(priority.selectedItem?.priority, isDisabled)}
                            </button>
                        </DropdownTrigger>
                        <DropdownContent sideOffset={5}>
                            {priority.list.map((item) => (
                                <SingleSelectItem
                                    key={item.priority}
                                    onSelect={() => {
                                        priority.onChange(item);
                                    }}
                                    isSelected={priority.selectedItem.value === item.value}
                                    {...elem('badgeListItem')}
                                >
                                    {renderPriorityIcon(item.priority)}
                                    <Text inline>{item.label}</Text>
                                </SingleSelectItem>
                            ))}
                        </DropdownContent>
                    </DropdownRoot>
                )}
                {children ? (
                    <DropdownRoot>
                        <DropdownTrigger asChild>
                            <button
                                aria-label={buttonLabel}
                                disabled={isDisabled}
                                type="button"
                                {...elem('optionButton')}
                            >
                                <Text inline size="small" {...elem('valueText')}>
                                    {label}
                                </Text>
                                {additionalLabel && (
                                    <Text inline size="small" {...elem('optionText')}>
                                        {additionalLabel}
                                    </Text>
                                )}
                            </button>
                        </DropdownTrigger>
                        <DropdownContent {...elem('badgeDropdownList')} sideOffset={5}>
                            {children}
                        </DropdownContent>
                    </DropdownRoot>
                ) : (
                    <div {...elem('valueContainer')}>
                        <Text inline size="small" {...elem('valueText')}>
                            {label}
                        </Text>
                        {additionalLabel && (
                            <Text inline size="small" {...elem('optionText')}>
                                {additionalLabel}
                            </Text>
                        )}
                    </div>
                )}
                {onDelete && (
                    <button
                        aria-label={deleteButtonLabel}
                        disabled={isDisabled}
                        onClick={handleOnDelete}
                        type="button"
                        {...elem('deleteButton')}
                    >
                        <Close viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }} />
                    </button>
                )}
            </div>
        );
    }
);
