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

export interface Option {
    value: string;
    label: string;
}

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /**
     * Children nodes to be rendered within the component,
     * specifically used to display the selected value from parent component.
     */
    children: React.ReactNode;
    /**
     * Optional object containing labels for different priorities, used primarily for localization.
     */
    priorityLabels?: {
        mandatory?: string;
        important?: string;
        optional?: string;
        exclude?: string;
    };
    /**
     * Current priority value that indicates the importance of the component.
     * Uses the Priority type which can be 'mandatory', 'important', 'optional', or 'exclude'.
     */
    priority: Priority;
    /**
     * Optional object specifying the currently selected option with value and label properties.
     */
    option?: Option;
    /**
     * Array of options available for selection.
     * Each option is an object with a value and a label.
     */
    optionList?: Array<Option>;
    /**
     * Optional header title for the options list when displayed, such as in a dropdown.
     */
    optionListHeader?: string;
    /**
     * Function to be called when the delete button is clicked.
     */
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    /**
     * Callback function triggered when a new priority is selected.
     * Provides the newly selected priority as an argument.
     */
    onPriorityChange?: (newPriority: Priority) => void;
    /**
     * Callback function triggered when a new option is selected.
     * Provides the newly selected option object as an argument.
     */
    onChange: (newOption: Option) => void;
    /**
     * Boolean indicating whether the whole badge should be disabled.
     */
    isDisabled?: boolean;
    /** Priority button label name for ARIA labelling */
    priorityButtonLabel: string;
    /** Option button label name for ARIA labelling */
    optionButtonLabel: string;
    /** Delete button label name for ARIA labelling */
    deleteButtonLabel: string;
}

const { block, elem } = bem('SelectBadge', styles);

export const SelectBadge: React.FC<Props> = ({
    children,
    isDisabled = false,
    onChange,
    onDelete = undefined,
    onPriorityChange = undefined,
    option,
    optionList,
    optionListHeader,
    priority = 'mandatory',
    priorityLabels,
    priorityButtonLabel,
    optionButtonLabel,
    deleteButtonLabel,
    ...rest
}) => {
    const [dropdownStates, setDropdownStates] = React.useState({
        priority: false,
        option: false,
    });

    const badgeRef = React.useRef<HTMLDivElement | null>(null);

    const hasPriorityLabels = priorityLabels && Object.keys(priorityLabels).length > 0;

    const renderPriorityIcon = (priorityType: Priority, disabled: boolean = false) => {
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
            {hasPriorityLabels && onPriorityChange && (
                <Dropdown<Priority>
                    button={
                        <button
                            aria-label={`${priorityButtonLabel}`}
                            disabled={isDisabled}
                            type="button"
                            {...elem('priorityButton', {
                                isSelected: dropdownStates.priority,
                            })}
                        >
                            {renderPriorityIcon(priority, isDisabled)}
                        </button>
                    }
                    additionalSelectProps={{
                        onStateChange: (state) => toggleDropdown('priority', state.isOpen),
                    }}
                    onChange={(newPriority) => onPriorityChange(newPriority)}
                    placement="bottom-start"
                    refElement={badgeRef}
                >
                    {Object.entries(priorityLabels).map(([key, label]) => (
                        <ListItem key={key} value={key}>
                            {renderPriorityIcon(key as Priority)}
                            <Text inline size="small">
                                {label}
                            </Text>
                        </ListItem>
                    ))}
                </Dropdown>
            )}

            {optionList ? (
                <Dropdown<Option>
                    button={
                        <button
                            {...elem('optionButton', {
                                isSelected: dropdownStates.option,
                            })}
                            aria-label={`${option?.label} ${optionButtonLabel}`}
                            disabled={isDisabled}
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
                                    title={option?.label}
                                    size="small"
                                >
                                    {option.label}
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
                >
                    {optionListHeader ? (
                        <div {...elem('listHeadline')}>
                            <Text inline title={optionListHeader}>
                                {optionListHeader?.toUpperCase()}
                            </Text>
                        </div>
                    ) : null}
                    {optionList?.map((opt) => (
                        <ListItem key={opt.value} value={opt}>
                            <Text inline size="small">
                                {opt.label}
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
};

SelectBadge.displayName = 'SelectBadge';
