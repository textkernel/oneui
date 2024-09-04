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
    selectedItem?: PriorityItem<PriorityItemValue>;
    /** Array of availible priority items. */
    list: Array<PriorityItem<PriorityItemValue>>;
    /** Callback function triggered when a new priority is selected. */
    onChange: (newPriorityItem: PriorityItem<PriorityItemValue>) => void;
    /** Priority button label name for ARIA labelling */
    buttonAriaLabel: string;
};

// Option related props
type OptionProps<OptionItem> = {
    /** Currently selected option item. */
    selectedItem?: OptionItem;
    /** Header title for the options list. */
    listHeader?: string;
    /** Array of options available for selection. */
    list?: Array<OptionItem>;
    /** Converts an option to a string label for display. */
    toLabel: (option: OptionItem) => string;
    /** Generates a unique key for an option. */
    toKey: (option: OptionItem) => string;
    /** Callback function triggered when a new option is selected. */
    onChange?: (newOptionItem: OptionItem) => void;
    /** Option button label name for ARIA labelling */
    buttonAriaLabel: string;
};

export interface Props<PriorityItemValue, OptionItem>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
    deleteButtonAriaLabel?: string;
    priority?: PriorityProps<PriorityItemValue>;
    option?: OptionProps<OptionItem>;
}

const { block, elem } = bem('SelectBadge', styles);
export function SelectBadge<PriorityItemValue, OptionItem>({
    children,
    isDisabled = false,
    onDelete = undefined,
    deleteButtonAriaLabel,
    priority,
    option,
    ...rest
}: Props<PriorityItemValue, OptionItem>) {
    const [dropdownStates, setDropdownStates] = React.useState({
        priority: false,
        option: false,
    });

    const badgeRef = React.useRef<HTMLDivElement | null>(null);

    const hasPriorityList = priority && priority.list && priority.list.length > 0;

    const hasOptionList = option && option.list && option.list.length > 0;

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
            {hasPriorityList && (
                <Dropdown<PriorityItem<PriorityItemValue>>
                    button={
                        <button
                            {...elem('priorityButton', {
                                isSelected: dropdownStates.priority,
                            })}
                            aria-label={priority.buttonAriaLabel}
                            disabled={isDisabled}
                            type="button"
                        >
                            {renderPriorityIcon(priority.selectedItem?.priority, isDisabled)}
                        </button>
                    }
                    additionalSelectProps={{
                        onStateChange: (state) => toggleDropdown('priority', state.isOpen),
                    }}
                    onChange={(newPriorityItem) => priority.onChange(newPriorityItem)}
                    placement="bottom-start"
                    listClassName={styles.badgeDropdownList}
                    refElement={badgeRef}
                >
                    {priority.list.map((item) => (
                        <ListItem className={styles.badgeListItem} key={item.priority} value={item}>
                            {renderPriorityIcon(item.priority)}
                            <Text inline size="small">
                                {item.label}
                            </Text>
                        </ListItem>
                    ))}
                </Dropdown>
            )}

            {hasOptionList ? (
                <Dropdown<OptionItem>
                    button={
                        <button
                            {...elem('optionButton', {
                                isSelected: dropdownStates.option,
                            })}
                            aria-label={option.buttonAriaLabel}
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
                            {option.selectedItem && (
                                <Text
                                    {...elem('optionText')}
                                    inline
                                    title={option.toLabel(option.selectedItem)}
                                    size="small"
                                >
                                    {option.toLabel(option.selectedItem)}
                                </Text>
                            )}
                        </button>
                    }
                    additionalSelectProps={{
                        onStateChange: (state) => toggleDropdown('option', state.isOpen),
                    }}
                    onChange={(newOptionItem) => option.onChange?.(newOptionItem)}
                    placement="bottom"
                    refElement={badgeRef}
                    listClassName={styles.badgeDropdownList}
                >
                    {option.listHeader ? (
                        <div {...elem('listHeadline')}>
                            <Text inline title={option.listHeader}>
                                {option.listHeader.toUpperCase()}
                            </Text>
                        </div>
                    ) : null}
                    {option.list?.map((opt) => (
                        <ListItem
                            className={styles.badgeListItem}
                            key={option.toKey(opt)}
                            value={opt}
                        >
                            <Text inline size="small">
                                {option.toLabel(opt)}
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
                    {option && option.selectedItem && (
                        <Text
                            {...elem('optionText')}
                            inline
                            title={option.toLabel(option.selectedItem)}
                            size="small"
                        >
                            {option.toLabel(option.selectedItem)}
                        </Text>
                    )}
                </div>
            )}

            {onDelete && (
                <button
                    {...elem('deleteButton')}
                    aria-label={deleteButtonAriaLabel}
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
