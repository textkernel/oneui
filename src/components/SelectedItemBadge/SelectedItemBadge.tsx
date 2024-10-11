import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import KeyboardDoubleArrowUp from '@material-design-icons/svg/round/keyboard_double_arrow_up.svg';
import KeyboardArrowUp from '@material-design-icons/svg/round/keyboard_arrow_up.svg';
import KeyboardArrowDown from '@material-design-icons/svg/round/keyboard_arrow_down.svg';
import { EmptyElement } from '@textkernel/oneui/customTypes/types';
// import { bem } from '../../utils';
import { ListItemProps } from '../List';
import { Text } from '../Text';
import styles from './SelectedItemBadge.scss';
import { DropdownContent, DropdownItem, DropdownRoot, DropdownTrigger } from '../Dropdown';

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

export interface Props<PriorityItemValue, ChildrenItemValue>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Children nodes to be rendered within the Dropdown,
     *  which is triggered by the main button
     * */
    children?:
        | React.ReactElement
        | React.ReactElement<ListItemProps>
        | (React.ReactElement<ListItemProps> | EmptyElement)[]
        | (
              | React.ReactElement<ListItemProps>
              | React.ReactElement<ListItemProps>[]
              | EmptyElement
          )[];
    /** Label of the currently selected option item from filter */
    label: React.ReactNode;
    /** An additional label displayed next to the main label (e.g., the number of synonyms) */
    additionalLabel?: React.ReactNode;
    /** Callback called on selecting one of the passed as children items. */
    onChange?: (value: ChildrenItemValue) => void;
    /** Determines if the children represent a multi-select dropdown */
    isMultiSelect?: boolean;
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

// const { block, elem } = bem('SelectedItemBadge', styles);

// TODO: fix types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SelectedItemBadge = React.forwardRef<any, Props<any, any>>(
    (
        {
            children,
            label,
            additionalLabel,
            // isMultiSelect = false,
            isDisabled = false,
            onChange,
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
                <IconComponent className={styles.icon} disabled={disabled} viewBox="0 0 24 24" />
            ) : null;
        };

        const handleOnDelete = (e: React.KeyboardEvent | React.MouseEvent) => {
            e.stopPropagation();
            onDelete?.(e);
        };

        return (
            <div
                {...rest}
                className={styles.selectedItemBadge}
                ref={ref}
                style={{
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                {/* Priority Dropdown using Radix UI DropdownMenu */}
                {hasPriorityList && (
                    <DropdownRoot>
                        <DropdownTrigger asChild>
                            <button
                                className={styles.priorityButton}
                                aria-label={priority.buttonLabel}
                                disabled={isDisabled}
                                type="button"
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: '4px',
                                }}
                            >
                                {renderPriorityIcon(priority.selectedItem?.priority, isDisabled)}
                            </button>
                        </DropdownTrigger>
                        <DropdownContent
                            className={styles.badgeDropdownList}
                            style={{
                                padding: '10px',
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                            sideOffset={5}
                        >
                            {priority.list.map((item) => (
                                <DropdownItem
                                    key={item.priority}
                                    onSelect={() => {
                                        priority.onChange(item);
                                    }}
                                    className={styles.badgeListItem}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {renderPriorityIcon(item.priority)}
                                    <Text inline size="small">
                                        {item.label}
                                    </Text>
                                </DropdownItem>
                            ))}
                        </DropdownContent>
                    </DropdownRoot>
                )}

                {/* Main Dropdown for Options */}
                {children ? (
                    <DropdownRoot>
                        <DropdownTrigger asChild>
                            <button
                                className={styles.optionButton}
                                aria-label={buttonLabel}
                                disabled={isDisabled}
                                type="button"
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: '4px',
                                }}
                            >
                                <Text inline size="small" className={styles.valueText}>
                                    {label}
                                </Text>
                                {additionalLabel && (
                                    <Text inline size="small" className={styles.optionText}>
                                        {additionalLabel}
                                    </Text>
                                )}
                            </button>
                        </DropdownTrigger>
                        <DropdownContent
                            className={styles.badgeDropdownList}
                            style={{
                                padding: '10px',
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                            sideOffset={5}
                        >
                            {children}
                        </DropdownContent>
                    </DropdownRoot>
                ) : (
                    <div className={styles.valueContainer}>
                        <Text inline size="small" className={styles.valueText}>
                            {label}
                        </Text>
                        {additionalLabel && (
                            <Text inline size="small" className={styles.optionText}>
                                {additionalLabel}
                            </Text>
                        )}
                    </div>
                )}

                {/* Delete Button */}
                {onDelete && (
                    <button
                        className={styles.deleteButton}
                        aria-label={deleteButtonLabel}
                        disabled={isDisabled}
                        onClick={handleOnDelete}
                        type="button"
                        style={{
                            padding: '4px',
                            backgroundColor: '#ffcdd2',
                            borderRadius: '4px',
                        }}
                    >
                        <Close viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }} />
                    </button>
                )}
            </div>
        );
    }
);

SelectedItemBadge.displayName = 'SelectedItemBadge';
