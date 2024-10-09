import * as React from 'react';
import Close from '@material-design-icons/svg/round/close.svg';
import KeyboardDoubleArrowUp from '@material-design-icons/svg/round/keyboard_double_arrow_up.svg';
import KeyboardArrowUp from '@material-design-icons/svg/round/keyboard_arrow_up.svg';
import KeyboardArrowDown from '@material-design-icons/svg/round/keyboard_arrow_down.svg';
import { bem } from '../../../utils/bem';
import { Dropdown } from '../Dropdown';
import { ListItem } from '../../List';
import { Text } from '../../Text';
import styles from './PrioritySelector.scss';
import { IconButton } from '../../Buttons';

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
    value?: string;
};

const defaultList: PriorityItem[] = [
    { priority: 'mandatory', label: 'Mandatory' },
    { priority: 'important', label: 'Important' },
    { priority: 'optional', label: 'Optional' },
    { priority: 'exclude', label: 'Exclude' },
];

export interface Props<>extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Currently selected priority item that indicates the importance of the component. */
    selectedItem: PriorityItem;
    /** Array of availible priority items. */
    list: PriorityItem[];
    /** Callback function triggered when a new priority is selected. */
    onChange: (newPriorityItem: PriorityItem) => void;
    /** Boolean indicating whether the whole badge should be disabled. */
    isDisabled?: boolean;
    /** Priority button label name for ARIA labelling */
    buttonLabel?: string;
}

const { block, elem } = bem('PrioritySelector', styles);
export function PrioritySelector({
    selectedItem,
    isDisabled = false,
    onChange,
    buttonLabel,
    list = defaultList,
    ...rest
}: Props) {
    const badgeRef = React.useRef<HTMLDivElement | null>(null);

    const hasPriorityList = list && list.length > 0;

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

    return (
        <div {...block({ ...rest })} ref={badgeRef}>
            {hasPriorityList && (
                <Dropdown<PriorityItem>
                    button={
                        <IconButton
                            {...elem('icon', { [selectedItem.priority]: true })}
                            variant="ghost"
                            aria-label={buttonLabel}
                            disabled={isDisabled}
                            type="button"
                        >
                            {renderPriorityIcon(selectedItem.priority, isDisabled)}
                        </IconButton>
                    }
                    onChange={(newPriorityItem) => onChange(newPriorityItem)}
                    placement="bottom-start"
                    listClassName={styles.badgeDropdownList}
                    refElement={badgeRef}
                >
                    {list.map((item) => (
                        <ListItem className={styles.badgeListItem} key={item.priority} value={item}>
                            {renderPriorityIcon(item.priority)}
                            <Text inline size="small">
                                {item.label}
                            </Text>
                        </ListItem>
                    ))}
                </Dropdown>
            )}
        </div>
    );
}

PrioritySelector.displayName = 'PrioritySelector';
