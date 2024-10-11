import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import KeyboardDoubleArrowUp from '@material-design-icons/svg/round/keyboard_double_arrow_up.svg';
import KeyboardArrowUp from '@material-design-icons/svg/round/keyboard_arrow_up.svg';
import KeyboardArrowDown from '@material-design-icons/svg/round/keyboard_arrow_down.svg';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
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

export type PriorityItem = {
    priority: Priority;
    label: string;
    value?: any;
};

type PriorityProps = {
    selectedItem: PriorityItem;
    list: Array<PriorityItem>;
    onChange: (newPriorityItem: PriorityItem) => void;
    buttonLabel: string;
};

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    children?: any;
    label: React.ReactNode;
    additionalLabel?: React.ReactNode;
    onChange?: (value: any) => void;
    isMultiSelect?: boolean;
    onDelete?: (e: React.KeyboardEvent | React.MouseEvent) => void;
    isDisabled?: boolean;
    buttonLabel?: string;
    deleteButtonLabel?: string;
    priority?: PriorityProps;
}

const SelectedItemBadge = React.forwardRef<any, Props>(
    (
        {
            children,
            label,
            additionalLabel,
            isMultiSelect = false,
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
            if (!priorityType) return null;
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
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
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
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
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
                                <DropdownMenu.Item
                                    key={item.priority}
                                    onSelect={(event) => {
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
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}

                {/* Main Dropdown for Options */}
                {children ? (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
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
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
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
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
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
export { SelectedItemBadge };
