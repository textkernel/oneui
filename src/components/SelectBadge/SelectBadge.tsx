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

export type PriorityItem<V> = {
    priority: Priority;
    label: string;
    value?: V;
};

export interface Props<V, O> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Children nodes to be rendered within the component,
     * specifically used to display the selected value from parent component.
     */
    children: React.ReactNode;
    /** Array of availible priority items. */
    priorityItems?: Array<PriorityItem<V>>;
    /** Currently selected priority item that indicates the importance of the component. */
    priorityItem?: PriorityItem<V>;
    /** Represents the currently selected option. */
    option?: O;
    /**
     * Converts an option to a string label for display. Required if `option` or `optionList` is used.
     *
     * @param option - The option that needs to be converted to a label.
     * @returns The label string corresponding to the given option.
     */
    optionToLabel?: (option: O) => string;
    /**
     * Generates a unique key for an option. If not provided, `optionToLabel` will be used.
     *
     * @param option - The option from which to extract a unique key.
     * @returns The unique key string corresponding to the given option.
     */
    optionToKey?: (option: O) => string;
    /** Array of options available for selection. */
    optionList?: Array<O>;
    /** Header title for the options list. */
    optionListHeader?: string;
    /** Function to be called when the delete button is clicked. */
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** Callback function triggered when a new priority is selected. */
    onPriorityChange?: (newPriorityItem: PriorityItem<V>) => void;
    /** Callback function triggered when a new option is selected. */
    onChange?: (newOption: O) => void;
    /** Boolean indicating whether the whole badge should be disabled. */
    isDisabled?: boolean;
    /** Priority button label name for ARIA labelling */
    priorityButtonLabel: string;
    /** Option button label name for ARIA labelling */
    optionButtonLabel: string;
    /** Delete button label name for ARIA labelling */
    deleteButtonLabel: string;
}

const { block, elem } = bem('SelectBadge', styles);

export function SelectBadge<V, O>({
    children,
    isDisabled = false,
    onChange = undefined,
    onDelete = undefined,
    onPriorityChange = undefined,
    option,
    optionToLabel,
    optionToKey,
    optionList,
    optionListHeader,
    priorityItem,
    priorityItems,
    priorityButtonLabel,
    optionButtonLabel,
    deleteButtonLabel,
    ...rest
}: Props<V, O>) {
    const [dropdownStates, setDropdownStates] = React.useState({
        priority: false,
        option: false,
    });

    const badgeRef = React.useRef<HTMLDivElement | null>(null);

    const hasPriorityItems = priorityItems && priorityItems.length > 0;
    const hasOptionList = optionList && optionList.length > 0;

    const renderPriorityIcon = (priorityType: Priority, disabled: boolean = false) => {
        const IconComponent = iconMap[priorityType];

        if (!IconComponent) {
            return null;
        }

        return (
            <IconComponent
                {...elem('icon', { [priorityType]: true })}
                disabled={disabled}
                viewBox="0 0 24 24"
            />
        );
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
            {hasPriorityItems && priorityItem && onPriorityChange && (
                <Dropdown<PriorityItem<V>>
                    button={
                        <button
                            {...elem('priorityButton', {
                                isSelected: dropdownStates.priority,
                            })}
                            aria-label={`${priorityButtonLabel}`}
                            disabled={isDisabled}
                            type="button"
                        >
                            {renderPriorityIcon(priorityItem.priority, isDisabled)}
                        </button>
                    }
                    additionalSelectProps={{
                        onStateChange: (state) => toggleDropdown('priority', state.isOpen),
                    }}
                    onChange={(newPriorityItem) => onPriorityChange(newPriorityItem)}
                    placement="bottom-start"
                    listClassName={styles.badgeDropdownList}
                    refElement={badgeRef}
                >
                    {priorityItems.map((item) => (
                        <ListItem className={styles.badgeListItem} key={item.priority} value={item}>
                            {renderPriorityIcon(item.priority)}
                            <Text inline size="small">
                                {item.label}
                            </Text>
                        </ListItem>
                    ))}
                </Dropdown>
            )}

            {hasOptionList && optionToLabel && onChange ? (
                <Dropdown<O>
                    button={
                        <button
                            {...elem('optionButton', {
                                isSelected: dropdownStates.option,
                            })}
                            aria-label={
                                option
                                    ? `${optionToLabel(option)} ${optionButtonLabel}`
                                    : optionButtonLabel
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
                            {option && (
                                <Text
                                    {...elem('optionText')}
                                    inline
                                    title={optionToLabel(option)}
                                    size="small"
                                >
                                    {optionToLabel(option)}
                                </Text>
                            )}
                        </button>
                    }
                    additionalSelectProps={{
                        onStateChange: (state) => toggleDropdown('option', state.isOpen),
                    }}
                    onChange={(newOption) => onChange(newOption)}
                    placement="bottom"
                    refElement={badgeRef}
                    listClassName={styles.badgeDropdownList}
                >
                    {optionListHeader ? (
                        <div {...elem('listHeadline')}>
                            <Text inline title={optionListHeader}>
                                {optionListHeader.toUpperCase()}
                            </Text>
                        </div>
                    ) : null}
                    {optionList.map((opt) => (
                        <ListItem
                            className={styles.badgeListItem}
                            key={optionToKey ? optionToKey(opt) : optionToLabel(opt)}
                            value={opt}
                        >
                            <Text inline size="small">
                                {optionToLabel(opt)}
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
