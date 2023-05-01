import React, { forwardRef } from 'react';
import { bem } from '../../../utils';
import { Text } from '../../Text';
import { Context, ENTER_KEY } from '../../../constants';
import styles from './ListItem.scss';

export interface Props extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> {
    /** List Items */
    children?: React.ReactNode;
    /** A function to be called if the item is clicked */
    onClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
    /** Formats this item as selected  */
    isSelected?: boolean;
    /** Formats this item as selected  */
    isHighlighted?: boolean;
    /** Format this item as disabled */
    disabled?: boolean;
    /** In some cases you need to pass disabled attributes to the top level 'li'
     * e.g. in the context of downshift to disable keyboard navigation on these items
     */
    passDisabledToLi?: boolean;
    /** formatting context when hovered or selected */
    highlightContext?: Context | 'default';
    /** Item identifier is used in {@link Dropdown} to select/navigate through children */
    value?: unknown;
}

const { block } = bem('ListItem', styles);

export const ListItem = forwardRef<HTMLLIElement, Props>(
    (
        {
            children,
            isSelected = false,
            isHighlighted = false,
            onClick,
            highlightContext = 'default',
            value,
            disabled = false,
            passDisabledToLi = false,
            ...rest
        },
        ref
    ) => {
        const customBlockMod = { clickable: typeof onClick === 'function' };

        const liProps: React.HTMLAttributes<HTMLLIElement> & { disabled?: boolean } = rest;
        if (passDisabledToLi) {
            liProps.disabled = disabled;
        }

        const handleKeyDown = (e) => {
            if (e.key === ENTER_KEY && onClick) {
                onClick(e);
            }
        };

        return (
            <li
                {...liProps}
                ref={ref}
                role="option"
                onClick={onClick}
                aria-selected={isHighlighted}
                onKeyDown={handleKeyDown}
                {...block({
                    isHighlighted,
                    isSelected,
                    highlightContext,
                    disabled,
                    passDisabledToLi,
                    ...rest,
                    ...customBlockMod,
                })}
            >
                {React.Children.map(children, (child) =>
                    typeof child === 'string' ? <Text inline>{child}</Text> : child
                )}
            </li>
        );
    }
);

ListItem.displayName = 'ListItem';
