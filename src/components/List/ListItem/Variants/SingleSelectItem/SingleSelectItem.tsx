import React from 'react';
import { bem } from '../../../../../utils';
import { Props as ListItemProps } from '../../ListItem';
import { Text } from '../../../../Text';
import styles from './SingleSelectItem.scss';

const { block } = bem('SingleSelectItem', styles);

export const SingleSelectItem = React.forwardRef<HTMLLIElement, ListItemProps>(
    (
        {
            disabled = false,
            isSelected = false,
            isHighlighted = false,
            passDisabledToLi = false,
            children,
            onClick,
            ...rest
        },
        ref
    ) => {
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
                ref={ref}
                {...block({ isSelected, disabled, isHighlighted })}
            >
                <Text inline>{children}</Text>
            </li>
        );
    }
);
