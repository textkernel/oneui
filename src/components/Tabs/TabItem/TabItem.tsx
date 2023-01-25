import * as React from 'react';
import { bem } from '../../../utils';
import { ENTER_KEY } from '../../../constants';
import styles from './TabItem.scss';
import { ReactNode } from '../../../customTypes/types';

export interface Props<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Id of this tab */
    tabId: T;
    /** Renders an active tab. This prop will be set by TabsBar if activeTabId is defined there */
    isActive?: boolean;
    /** Disabled tab item */
    disabled?: boolean;
    /** A callback  when the tab is clicked. It will not be called for active or disabled tabs. This prop will be set by TabsBar if onSelect is defined there */
    onSelect?: (tabId: T) => void;
    /** Label of the tab. Expected to be a string like node. E.g. `label` or `label <span>(3)</span>`  */
    children: ReactNode;
    /** used for styling when TabsBar is full width. Will be set by TabsBar, no need to set manually */
    isBlock?: boolean;
}

const { block } = bem('TabItem', styles);

export function TabItem<T = string | number>({
    tabId,
    isActive = false,
    onSelect,
    disabled = false,
    isBlock = false,
    children,
    ...rest
}: Props<T>) {
    const handleClick = () => {
        if (!isActive && !disabled && onSelect) {
            onSelect(tabId);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === ENTER_KEY) {
            handleClick();
        }
    };

    return (
        <div
            tabIndex={0}
            {...rest}
            {...block({ isActive, isBlock, ...rest })}
            role="tab"
            aria-selected={isActive}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {children}
        </div>
    );
}

TabItem.displayName = 'TabItem';
