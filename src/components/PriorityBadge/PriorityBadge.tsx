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
import styles from './PriorityBadge.scss';

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
    optionList: Array<Option>;
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
    isPriorityDisabled?: boolean;
    /**
     * Boolean indicating whether the option selection is disabled.
     * Useful for controlling access to option changes dynamically.
     */
    isOptionDisabled?: boolean;
}

const { block, elem } = bem('PriorityBadge', styles);

export const PriorityBadge: React.FC<Props> = ({
    children,
    priorityLabels,
    priority = 'mandatory',
    option,
    optionList,
    optionListHeader,
    onClose = undefined,
    onPriorityChange = undefined,
    isPriorityDisabled = false,
    isOptionDisabled = false,
    isCloseButtonDisabled = false,
    onChange,
    ...rest
}) => {
    const [dropdownStates, setDropdownStates] = React.useState({
        priority: false,
        option: false,
    });

    const badgeRef = React.useRef<HTMLDivElement | null>(null);

    const hasPriorityLabels = priorityLabels && Object.keys(priorityLabels).length > 0;

    const iconMap = React.useMemo(
        () => ({
            mandatory: MdKeyboardDoubleArrowUp,
            important: MdKeyboardArrowUp,
            optional: MdKeyboardArrowDown,
            exclude: MdClose,
        }),
        []
    );

    function renderPriorityIcon(priorityType: Priority, disabled: boolean = false) {
        const IconComponent = iconMap[priorityType];

        return IconComponent ? (
            <IconComponent {...elem('icon', { [priorityType]: true })} disabled={disabled} />
        ) : null;
    }

    const handleOnClose = React.useCallback(
        (e: React.KeyboardEvent | React.MouseEvent) => {
            e.stopPropagation();
            if (onClose) {
                onClose(e);
            }
        },
        [onClose]
    );

    const toggleDropdown = React.useCallback((type: 'priority' | 'option', isOpen: boolean) => {
        if (isOpen !== undefined) {
            setDropdownStates((prev) => ({ ...prev, [type]: isOpen }));
        }
    }, []);

    return (
        <div {...rest} {...block({ ...rest })} ref={badgeRef}>
            {hasPriorityLabels && onPriorityChange && (
                <Dropdown<Priority>
                    button={
                        <button
                            aria-label={`${priority} priority button`}
                            disabled={isPriorityDisabled}
                            type="button"
                            {...elem('priorityButton', {
                                isSelected: dropdownStates.priority,
                            })}
                        >
                            {renderPriorityIcon(priority, isPriorityDisabled)}
                        </button>
                    }
                    additionalSelectProps={(state) => toggleDropdown('priority', state.isOpen)}
                    onChange={(newPriority) => onPriorityChange(newPriority)}
                    placement="bottom-start"
                    refElement={badgeRef}
                >
                    {Object.entries(priorityLabels).map(([key, label]) => (
                        <ListItem key={key} value={key}>
                            {renderPriorityIcon(key as Priority)}
                            <Text inline>{label}</Text>
                        </ListItem>
                    ))}
                </Dropdown>
            )}

            <Dropdown<Option>
                button={
                    <button
                        {...elem('optionButton', {
                            isSelected: dropdownStates.option,
                        })}
                        aria-label={`${option?.label} option button`}
                        disabled={isOptionDisabled}
                    >
                        <Text
                            inline
                            {...elem('optionButton--valueText')}
                            {...(typeof children === 'string' && { title: children })}
                        >
                            {children}
                        </Text>
                        {option && (
                            <Text
                                {...elem('optionButton--optionText')}
                                inline
                                title={option?.label}
                            >
                                {option.label}
                            </Text>
                        )}
                    </button>
                }
                additionalSelectProps={(state) => toggleDropdown('option', state.isOpen)}
                onChange={(newOption) => onChange(newOption)}
                placement="bottom"
                refElement={badgeRef}
            >
                <div {...elem('listHeadline')}>
                    <Text inline title={optionListHeader}>
                        {optionListHeader?.toUpperCase()}
                    </Text>
                </div>
                {optionList?.map((opt) => (
                    <ListItem key={opt.value} value={opt}>
                        <Text inline>{opt.label}</Text>
                    </ListItem>
                ))}
            </Dropdown>

            {onClose && (
                <button
                    {...elem('closeButton')}
                    aria-label="closeButton"
                    disabled={isCloseButtonDisabled}
                    onClick={handleOnClose}
                    type="button"
                >
                    <MdClose size="20px" aria-label="closeButtonIcon" />
                </button>
            )}
        </div>
    );
};

PriorityBadge.displayName = 'PriorityBadge';
