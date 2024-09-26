import React from 'react';
import { bem } from '../../../../../utils';
import { Props as ListItemProps } from '../../ListItem';
import { Checkbox } from '../../../../Checkbox';
import { Text } from '../../../../Text';
import { SPACE_KEY } from '../../../../../constants';
import styles from './MultiSelectItem.scss';

export interface Props
    extends Omit<ListItemProps, 'onClick' | 'onChange' | 'value' | 'highlightContext'> {
    /** A function to be called if the item is clicked */
    onChange?: (e: React.SyntheticEvent<HTMLInputElement | HTMLLIElement>, value) => void;
    /** Item identifier is used in {@link Dropdown} to select/navigate through children */
    value: unknown;
    /** Id for the checkbox */
    id?: string;
    /** a variant to determine the look and feel of component */
    variant?: 'option' | 'select-all' | 'group-title';
    /** to add a priority badge before the label */
    hasPriority?: boolean;
}

const { block } = bem('MultiSelectItem', styles);

export const MultiSelectItem = React.forwardRef<HTMLLIElement, Props>(
    (
        {
            children,
            isSelected = false,
            isHighlighted = false,
            onChange,
            id,
            value,
            disabled = false,
            passDisabledToLi = false,
            variant = 'option',
            hasPriority = false, // eslint-disable-line @typescript-eslint/no-unused-vars
            ...rest
        },
        ref
    ) => {
        const uId = React.useId();
        const idToUse = id || uId;

        const liProps: React.HTMLAttributes<HTMLLIElement> & { disabled?: boolean } = rest;
        if (passDisabledToLi) {
            liProps.disabled = disabled;
        }

        const handleChange = (e: React.SyntheticEvent<HTMLLIElement | HTMLInputElement>) => {
            e.stopPropagation();
            onChange?.(e, value);
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement | HTMLInputElement>) => {
            e.stopPropagation();
            if ((e.target as HTMLElement).nodeName === 'LI' && e.key === SPACE_KEY) {
                handleChange(e);
            }
        };

        return (
            <li
                {...liProps}
                onKeyDown={handleKeyDown}
                ref={ref}
                role="option"
                aria-selected={isSelected}
                tabIndex={disabled ? -1 : 0}
                {...block({
                    isHighlighted,
                    isSelected,
                    disabled,
                    passDisabledToLi,
                    variant,
                    ...rest,
                })}
            >
                <Checkbox
                    id={idToUse}
                    checked={isSelected}
                    disabled={disabled}
                    onChange={handleChange}
                    tabIndex={-1}
                >
                    <>
                        {/* to be implemented: {hasPriority && <PriorityBadge />} */}
                        <Text inline>{children}</Text>
                    </>
                </Checkbox>
            </li>
        );
    }
);

MultiSelectItem.displayName = 'MultiSelectItem';
