import * as React from 'react';
import { bem } from '../../../utils';
import { ENTER_KEY } from '../../../constants';
import styles from './TabItem.scss';

export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Id of this tab */
    tabId: string | number;
    /** Renders an active tab. This prop will be set by TabsBar if activeTabId is defined there */
    isActive?: boolean;
    /** Disabled tab item */
    disabled?: boolean;
    /** A callback  when the tab is clicked. It will not be called for active or disabled tabs. This prop will be set by TabsBar if onSelect is defined there */
    onSelect?: (tabId: string | number) => void;
    /** Label of the tab. Expected to be a string like node. E.g. `label` or `label <span>(3)</span>`  */
    children: ReactNode;
    /** used for styling when TabsBar is full width. Will be set by TabsBar, no need to set manually */
    isBlock?: boolean;
}

const { block } = bem('TabItem', styles);

export const TabItem: React.FC<Props> = (props) => {
    const { tabId, isActive, onSelect, disabled, isBlock, children, ...rest } = props;
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
            {...block(props)}
            role="tab"
            aria-selected={isActive}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            {children}
        </div>
    );
};

TabItem.displayName = 'TabItem';

TabItem.defaultProps = {
    isActive: false,
    isBlock: false,
    disabled: false,
};
