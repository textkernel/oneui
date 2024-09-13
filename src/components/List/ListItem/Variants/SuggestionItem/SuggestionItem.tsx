import React, { useId } from 'react';
import { bem } from '../../../../../utils';
import { Checkbox } from '../../../../Checkbox';
import { Props as ListItemProps } from '../../ListItem';
import { Text } from '../../../../Text';
import styles from './SuggestionItem.scss';

type MultiSelectProps = {
    /** Add a checkbox to the item */
    hasCheckbox?: boolean;
    /** Checkbox id */
    id?: string;
    /** A function to be called if the checkbox changes */
    onChange: (e: React.SyntheticEvent<HTMLLIElement>, value: boolean) => void;
};

interface BaseProps extends Omit<ListItemProps, 'onClick' | 'onChange'> {
    /** A function to be called if the item is clicked */
    onClick?: () => void;
}

export type Props = BaseProps &
    (MultiSelectProps | { hasCheckbox?: false; id?: undefined; onChange?: undefined });

const { block, elem } = bem('SuggestionItem', styles);

export const SuggestionItem = ({
    disabled = false,
    isSelected = false,
    isHighlighted = true,
    hasCheckbox = false,
    passDisabledToLi = false,
    id,
    onClick,
    onChange,
    children,
    ...rest
}: Props) => {
    const uId = useId();
    const checkboxId = id ?? uId;

    const liProps: React.HTMLAttributes<HTMLLIElement> & { disabled?: boolean } = rest;
    if (passDisabledToLi) {
        liProps.disabled = disabled;
    }

    return (
        <li
            {...liProps}
            role="option"
            tabIndex={0}
            onClick={!hasCheckbox ? onClick : undefined}
            onKeyDown={() => {}}
            aria-selected={isSelected}
            {...block({ isSelected, disabled, isHighlighted })}
        >
            {hasCheckbox ? (
                <Checkbox
                    id={checkboxId}
                    checked={isSelected}
                    disabled={disabled}
                    onChange={onChange}
                    tabIndex={-1}
                    {...elem('checkbox', { disabled, isSelected })}
                >
                    <Text inline>{children}</Text>
                </Checkbox>
            ) : (
                <Text inline>{children}</Text>
            )}
        </li>
    );
};
