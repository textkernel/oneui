import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import KeyboardDoubleArrowUp from '@material-design-icons/svg/round/keyboard_double_arrow_up.svg';
import KeyboardArrowUp from '@material-design-icons/svg/round/keyboard_arrow_up.svg';
import KeyboardArrowDown from '@material-design-icons/svg/round/keyboard_arrow_down.svg';
import { EmptyElement } from '@textkernel/oneui/customTypes/types';
import { bem } from '../../utils';
import { Dropdown } from '../Dropdown';
import { ListItem, ListItemProps } from '../List';
import { Text } from '../Text';
import styles from './SelectedItemBadge.scss';

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
    buttonAriaLabel: string;
};

export interface Props<PriorityItemValue, ChildrenItemValue>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Children nodes to be rendered within the component,
     * specifically used to display the selected value from parent component.
     */
    children?:
        | React.ReactElement<ListItemProps>
        | (React.ReactElement<ListItemProps> | EmptyElement)[]
        | (
              | React.ReactElement<ListItemProps>
              | React.ReactElement<ListItemProps>[]
              | EmptyElement
          )[];
    /** Label of the currently selected option item from filter */
    label: React.ReactNode;
    /** Additional label represents radius or amount of synonyms */
    additionalLabel?: React.ReactNode;
    /**
     * Callback called on selecting one of the passed as children items.
     * Value parameter it is a `value` attribute of children item ({@link ListItemProps.value}).
     */
    onChange?: (value: ChildrenItemValue) => void;
    /** Determines if the children represent a multi-select dropdown */
    isMultiSelect?: boolean;
    /** Function to be called when the delete button is clicked. */
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /** Boolean indicating whether the whole badge should be disabled. */
    isDisabled?: boolean;
    /** Delete button label name for ARIA labelling */
    deleteButtonLabel?: string;
    priority?: PriorityProps<PriorityItemValue>;
}

const { block, elem } = bem('SelectedItemBadge', styles);
export function SelectedItemBadge<PriorityItemValue, ChildrenItemValue>({
    children,
    label,
    additionalLabel,
    isMultiSelect = false,
    isDisabled = false,
    onChange,
    onDelete = undefined,
    deleteButtonLabel,
    priority,
    ...rest
}: Props<PriorityItemValue, ChildrenItemValue>) {
    const [dropdownStates, setDropdownStates] = React.useState({
        priority: false,
        main: false,
    });

    const badgeRef = React.useRef<HTMLDivElement | null>(null);

    const hasPriorityList = priority && priority.list && priority.list.length > 0;

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

    const toggleDropdown = (type: 'priority' | 'main', isOpen: boolean) => {
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

            {children ? (
                <Dropdown<ChildrenItemValue>
                    button={
                        <button
                            {...elem('optionButton', {
                                isSelected: dropdownStates.main,
                            })}
                            {...(typeof label === 'string' && { 'aria-label': label })}
                            disabled={isDisabled}
                            type="button"
                        >
                            <Text
                                inline
                                size="small"
                                {...elem('valueText')}
                                {...(typeof label === 'string' && { title: label })}
                            >
                                {label}
                            </Text>
                            {additionalLabel && (
                                <Text
                                    {...elem('optionText')}
                                    inline
                                    {...(typeof additionalLabel === 'string' && {
                                        title: additionalLabel,
                                    })}
                                    size="small"
                                >
                                    {additionalLabel}
                                </Text>
                            )}
                        </button>
                    }
                    additionalSelectProps={{
                        onStateChange: (state) => toggleDropdown('main', state.isOpen),
                    }}
                    onChange={(newOptionItem) => onChange?.(newOptionItem)}
                    placement="bottom"
                    refElement={badgeRef}
                    listClassName={styles.badgeDropdownList}
                    isMultiSelect={isMultiSelect}
                >
                    {children}
                </Dropdown>
            ) : (
                <div {...elem('valueContainer')}>
                    <Text
                        inline
                        size="small"
                        {...elem('valueText')}
                        {...(typeof label === 'string' && { title: label })}
                    >
                        {label}
                    </Text>
                    {additionalLabel && (
                        <Text
                            {...elem('optionText')}
                            inline
                            {...(typeof additionalLabel === 'string' && {
                                title: additionalLabel,
                            })}
                            size="small"
                        >
                            {additionalLabel}
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

SelectedItemBadge.displayName = 'SelectedItemBadge';
