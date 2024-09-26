import React from 'react';
import { bem } from '../../../../../utils';
import { Props as ListItemProps } from '../../ListItem';
import { Text } from '../../../../Text';
import styles from './SingleSelectItem.scss';

const { block, elem } = bem('SingleSelectItem', styles);

export const SingleSelectItem = ({
    disabled = false,
    isSelected = false,
    isHighlighted = false,
    passDisabledToLi = false,
    onClick,
    children,
    ...rest
}: ListItemProps) => {
    const liProps: React.HTMLAttributes<HTMLLIElement> & { disabled?: boolean } = rest;
    if (passDisabledToLi) {
        liProps.disabled = disabled;
    }

    return (
        <li
            {...liProps}
            role="option"
            onClick={onClick}
            onKeyDown={onClick}
            aria-selected={isSelected}
            {...block({ isSelected, disabled, isHighlighted })}
        >
            <Text inline {...elem('text')}>
                {children}
            </Text>
        </li>
    );
};
