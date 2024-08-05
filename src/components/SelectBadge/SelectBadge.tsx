import * as React from 'react';
import {
    MdClose,
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdKeyboardDoubleArrowUp,
} from 'react-icons/md';
import { bem } from '../../utils';
import { Dropdown } from '../Dropdown';
import { ListItem } from '../List';
import { Text } from '../Text';
import styles from './SelectBadge.scss';

const iconMap = {
    mandatory: MdKeyboardDoubleArrowUp,
    important: MdKeyboardArrowUp,
    optional: MdKeyboardArrowDown,
    exclude: MdClose,
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
     * Function to be called when the close button is clicked.
     */
    onClose?: (e: React.KeyboardEvent | React.MouseEvent) => void;
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
     * Boolean indicating whether the close button should be disabled.
     * Can be used to prevent closing under certain conditions.
     */
    isCloseButtonDisabled?: boolean;
    /**
     * Boolean indicating whether the priority selection is disabled.
     * Used to lock priority changes in specific situations.
     */
    isPriorityButtonDisabled?: boolean;
    /**
     * Boolean indicating whether the option selection is disabled.
     * Useful for controlling access to option changes dynamically.
     */
    isOptionButtonDisabled?: boolean;
    /** Priority button label name for ARIA labelling */
    priorityButtonLabel?: string;
    /** Option button label name for ARIA labelling */
    optionButtonLabel?: string;
    /** Close button label name for ARIA labelling */
    closeButtonLabel?: string;
}

const { block, elem } = bem('SelectBadge', styles);

export const SelectBadge: React.FC<Props> = ({
    children,
    isCloseButtonDisabled = false,
    isOptionButtonDisabled = false,
    isPriorityButtonDisabled = false,
    onChange,
    onClose = undefined,
    onPriorityChange = undefined,
    option,
    optionList,
    optionListHeader,
    priority = 'mandatory',
    priorityLabels,
    priorityButtonLabel = 'priority button',
    optionButtonLabel = 'option button',
    closeButtonLabel = 'close button',
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
            <IconComponent {...elem('icon', { [priorityType]: true })} disabled={disabled} />
        ) : null;
    };

    const handleOnClose = (e: React.KeyboardEvent | React.MouseEvent) => {
        e.stopPropagation();
        if (onClose) {
            onClose(e);
        }
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
                            aria-label={`${priority} ${priorityButtonLabel}`}
                            disabled={isPriorityButtonDisabled}
                            type="button"
                            {...elem('priorityButton', {
                                isSelected: dropdownStates.priority,
                            })}
                        >
                            {renderPriorityIcon(priority, isPriorityButtonDisabled)}
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
                            disabled={isOptionButtonDisabled}
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

            {onClose && (
                <button
                    {...elem('closeButton')}
                    aria-label={closeButtonLabel}
                    disabled={isCloseButtonDisabled}
                    onClick={handleOnClose}
                    type="button"
                >
                    <MdClose size="20px" />
                </button>
            )}
        </div>
    );
};

SelectBadge.displayName = 'SelectBadge';
