import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import KeyboardDoubleArrowUp from '@material-design-icons/svg/round/keyboard_double_arrow_up.svg';
import KeyboardArrowUp from '@material-design-icons/svg/round/keyboard_arrow_up.svg';
import KeyboardArrowDown from '@material-design-icons/svg/round/keyboard_arrow_down.svg';
import { bem } from '../../utils';
import { Dropdown } from '../Dropdown';
import { ListItem } from '../List';
import { Text } from '../Text';
import styles from './SelectBadge.scss';

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
    priorityItem?: PriorityItem<PriorityItemValue>;
    /** Array of availible priority items. */
    priorityItemList: Array<PriorityItem<PriorityItemValue>>;
    /** Callback function triggered when a new priority is selected. */
    onPriorityItemChange: (newPriorityItem: PriorityItem<PriorityItemValue>) => void;
    /** Priority button label name for ARIA labelling */
    priorityButtonLabel: string;
};

// Option related props
type OptionProps<OptionItem> = {
    /** Currently selected option item. */
    optionItem?: OptionItem;
    /** Header title for the options list. */
    optionItemListHeader?: string;
    /** Array of options available for selection. */
    optionItemList?: Array<OptionItem>;
    /** Converts an option to a string label for display. */
    optionToLabel: (option: OptionItem) => string;
    /** Generates a unique key for an option. If not provided, `optionToLabel` will be used. */
    optionToKey?: (option: OptionItem) => string;
    /** Callback function triggered when a new option is selected. */
    onOptionItemChange?: (newOptionItem: OptionItem) => void;
    /** Option button label name for ARIA labelling */
    optionButtonLabel: string;
};

export interface Props<PriorityItemValue, OptionItem> extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Children nodes to be rendered within the component,
     * specifically used to display the selected value from parent component.
     */
    children: React.ReactNode;
    /** Function to be called when the delete button is clicked. */
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** Boolean indicating whether the whole badge should be disabled. */
    isDisabled?: boolean;
    /** Delete button label name for ARIA labelling */
    deleteButtonLabel?: string;
    priority?: PriorityProps<PriorityItemValue>;
    option?: OptionProps<OptionItem>;
}

const { block, elem } = bem('SelectBadge', styles);
export function SelectBadge<PriorityItemValue, OptionItem>({
    children,
    isDisabled = false,
    onDelete = undefined,
    deleteButtonLabel,
    priority,
    option,
    ...rest
}: Props<PriorityItemValue, OptionItem>) {
    const [dropdownStates, setDropdownStates] = React.useState({
        priority: false,
        option: false,
    });

    const badgeRef = React.useRef<HTMLDivElement | null>(null);

    const hasPriorityItemList =
        priority && priority.priorityItemList && priority.priorityItemList.length > 0;

    const hasOptionItemList = option && option.optionItemList && option.optionItemList.length > 0;

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

    const handleOnDelete = (e: React.KeyboardEvent | React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.(e);
    };

    const toggleDropdown = (type: 'priority' | 'option', isOpen: boolean) => {
        /**
         * Updates the dropdown state only if 'isOpen' is explicitly defined,
         *  unintended state changes happen by mouse events cause 'isOpen' to become undefined
         * */
        if (isOpen !== undefined) {
            setDropdownStates((prev) => ({ ...prev, [type]: isOpen }));
        }
    };

    return (
        <div {...rest} {...block({ ...rest })} ref={badgeRef}>
            {hasPriorityItemList && (
                <Dropdown<PriorityItem<PriorityItemValue>>
                    button={
                        <button
                            {...elem('priorityButton', {
                                isSelected: dropdownStates.priority,
                            })}
                            aria-label={`${priority.priorityButtonLabel}`}
                            disabled={isDisabled}
                            type="button"
                        >
                            {renderPriorityIcon(priority.priorityItem?.priority, isDisabled)}
                        </button>
                    }
                    additionalSelectProps={{
                        onStateChange: (state) => toggleDropdown('priority', state.isOpen),
                    }}
                    onChange={(newPriorityItem) => priority.onPriorityItemChange(newPriorityItem)}
                    placement="bottom-start"
                    listClassName={styles.badgeDropdownList}
                    refElement={badgeRef}
                >
                    {priority.priorityItemList.map((item) => (
                        <ListItem className={styles.badgeListItem} key={item.priority} value={item}>
                            {renderPriorityIcon(item.priority)}
                            <Text inline size="small">
                                {item.label}
                            </Text>
                        </ListItem>
                    ))}
                </Dropdown>
            )}

            {hasOptionItemList ? (
                <Dropdown<OptionItem>
                    button={
                        <button
                            {...elem('optionButton', {
                                isSelected: dropdownStates.option,
                            })}
                            /**
                             * If optionItem is provided, the aria-label will concatenate the option's label
                             * (generated by the optionToLabel function) with optionButtonLabel;
                             * or it will use just optionButtonLabel if there is no option item.
                             */
                            aria-label={
                                option.optionItem
                                    ? `${option.optionToLabel(option.optionItem)} ${option.optionButtonLabel}`
                                    : option.optionButtonLabel
                            }
                            disabled={isDisabled}
                            type="button"
                        >
                            <Text
                                inline
                                size="small"
                                {...elem('valueText')}
                                {...(typeof children === 'string' && { title: children })}
                            >
                                {children}
                            </Text>
                            {option.optionItem && (
                                <Text
                                    {...elem('optionText')}
                                    inline
                                    title={option.optionToLabel(option.optionItem)}
                                    size="small"
                                >
                                    {option.optionToLabel(option.optionItem)}
                                </Text>
                            )}
                        </button>
                    }
                    additionalSelectProps={{
                        onStateChange: (state) => toggleDropdown('option', state.isOpen),
                    }}
                    onChange={(newOptionItem) => option.onOptionItemChange?.(newOptionItem)}
                    placement="bottom"
                    refElement={badgeRef}
                    listClassName={styles.badgeDropdownList}
                >
                    {option.optionItemListHeader ? (
                        <div {...elem('listHeadline')}>
                            <Text inline title={option.optionItemListHeader}>
                                {option.optionItemListHeader.toUpperCase()}
                            </Text>
                        </div>
                    ) : null}
                    {option.optionItemList?.map((opt) => (
                        <ListItem
                            className={styles.badgeListItem}
                            key={
                                option.optionToKey
                                    ? option.optionToKey(opt)
                                    : option.optionToLabel(opt)
                            }
                            value={opt}
                        >
                            <Text inline size="small">
                                {option.optionToLabel(opt)}
                            </Text>
                        </ListItem>
                    ))}
                </Dropdown>
            ) : (
                <div {...elem('valueContainer')}>
                    <Text
                        inline
                        size="small"
                        {...elem('valueText')}
                        {...(typeof children === 'string' && { title: children })}
                    >
                        {children}
                    </Text>
                    {option && option.optionItem && (
                        <Text
                            {...elem('optionText')}
                            inline
                            title={option.optionToLabel(option.optionItem)}
                            size="small"
                        >
                            {option.optionToLabel(option.optionItem)}
                        </Text>
                    )}
                </div>
            )}

            {onDelete && (
                <button
                    {...elem('deleteButton')}
                    aria-label={deleteButtonLabel}
                    disabled={isDisabled}
                    onClick={handleOnDelete}
                    type="button"
                >
                    <Close
                        viewBox="0 0 24 24"
                        style={{
                            width: '20px',
                            height: '20px',
                        }}
                    />
                </button>
            )}
        </div>
    );
}

SelectBadge.displayName = 'SelectBadge';
