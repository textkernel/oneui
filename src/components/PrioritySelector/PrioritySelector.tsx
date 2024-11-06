import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import KeyboardDoubleArrowUp from '@material-design-icons/svg/round/keyboard_double_arrow_up.svg';
import KeyboardArrowUp from '@material-design-icons/svg/round/keyboard_arrow_up.svg';
import KeyboardArrowDown from '@material-design-icons/svg/round/keyboard_arrow_down.svg';
import { DropdownMenuItem, Root, Portal } from '@radix-ui/react-dropdown-menu';
import { DropdownTrigger } from '../Dropdown/DropdownTrigger';
import { DropdownContent } from '../Dropdown/DropdownContent';
import { bem } from '../../utils/bem';
import { Text } from '../Text';
import { IconButton } from '../Buttons';
import itemStyles from '../Dropdown/Items/Item.scss';
import styles from './PrioritySelector.scss';

const iconMap = {
    mandatory: KeyboardDoubleArrowUp,
    important: KeyboardArrowUp,
    optional: KeyboardArrowDown,
    exclude: Close,
};

export enum Priority {
    Mandatory = 'mandatory',
    Important = 'important',
    Optional = 'optional',
    Exclude = 'exclude',
}

export type PriorityItemType<PriorityItemValue> = {
    /** priority types: mandatory, important, optional or exclude. Makes correct icon show up */
    priority: Priority;
    /** text that should accompany the icon in the dropdown */
    label: string;
    /** optional: used in case of application-specific values / custom priorities */
    value?: PriorityItemValue;
};

export interface Props<PriorityItemValue>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Currently selected priority item that indicates the importance of the component. */
    selectedItem: PriorityItemType<PriorityItemValue>;
    /** Array of availible priority items. */
    list: PriorityItemType<PriorityItemValue>[];
    /** Callback function triggered when a new priority is selected. */
    onSelect: (newPriorityItem: PriorityItemType<PriorityItemValue>) => void;
    /** Boolean indicating whether the whole badge should be disabled. */
    isDisabled?: boolean;
    /** Priority button label name for ARIA labelling */
    buttonLabel?: string;
    /** ref to possible parent div, if it is a badge */
    parentRef?: React.RefObject<HTMLElement | null> | React.ForwardedRef<HTMLDivElement>;
    /** ref to iconButton, used for keyboard navigation */
    buttonRef?: React.RefObject<HTMLElement>;
}

const { block, elem } = bem('PrioritySelector', styles);
const itemStylesBem = bem('DropdownItem', itemStyles);
export function PrioritySelector<PriorityItemValue>({
    onSelect,
    selectedItem,
    isDisabled = false,
    buttonLabel,
    list,
    parentRef,
    buttonRef,
    ...rest
}: Props<PriorityItemValue>) {
    const renderPriorityIcon = (priorityType?: Priority, disabled: boolean = false) => {
        if (!priorityType) {
            return null;
        }
        const IconComponent = iconMap[priorityType];
        return IconComponent ? (
            <IconComponent
                {...elem('icon', { [priorityType]: true })}
                disabled={disabled}
                viewBox="0 0 24 24"
            />
        ) : null;
    };

    const priorityOrder: Record<Priority, number> = {
        [Priority.Mandatory]: 1,
        [Priority.Important]: 2,
        [Priority.Optional]: 3,
        [Priority.Exclude]: 4,
    };

    // Sort the list based on the priority order
    const sortedList = list
        .slice()
        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return (
        <Root {...block({ ...rest })} refElement={parentRef}>
            <DropdownTrigger>
                <IconButton
                    {...elem('icon', { [selectedItem.priority]: true })}
                    variant="ghost"
                    aria-label={buttonLabel || selectedItem.label}
                    disabled={isDisabled}
                    type="button"
                    ref={buttonRef}
                >
                    {renderPriorityIcon(selectedItem.priority, isDisabled)}
                </IconButton>
            </DropdownTrigger>
            <Portal>
                <DropdownContent
                    {...elem('badgeDropdownList', { fixedWidth: !parentRef })}
                    sideOffset={6}
                    refElement={parentRef}
                >
                    {sortedList.map((item) => (
                        <DropdownMenuItem
                            key={item.priority}
                            onSelect={(e) => {
                                e.stopPropagation();
                                onSelect(item);
                            }}
                            role="option"
                            aria-selected={selectedItem.priority === item.priority}
                            tabIndex={isDisabled ? -1 : 0}
                            {...rest}
                            {...itemStylesBem.block({
                                isSelected: selectedItem === item,
                                disabled: isDisabled,
                                ...rest,
                            })}
                        >
                            <div {...elem('badgeListItem')}>
                                {renderPriorityIcon(item.priority)}
                                <Text inline size="small">
                                    {item.label}
                                </Text>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownContent>
            </Portal>
        </Root>
    );
}

PrioritySelector.displayName = 'PrioritySelector';
