import * as React from 'react';
import { bem } from '../../../utils';
import { TabItem, TabItemProps } from '../TabItem';
import styles from './TabsBar.scss';

interface Props<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Id of currently active tab. This will overwrite isActive on the children */
    activeTabId?: T;
    /** The tabs */
    children: React.ReactElement<TabItemProps<T>> | (React.ReactElement<TabItemProps<T>> | null)[];
    /** Callback function, fired when switching tabs by clicking. This will overwrite onSelect on children, if defined */
    onSelect?: (selectedTabId: T) => void;
    /** to render the tabs so they cover the full width of the available space */
    isBlock?: boolean;
}

interface PropsToPassToChild<T> {
    isActive?: boolean;
    onSelect?: Props<T>['onSelect'];
    isBlock?: Props<T>['isBlock'];
}

const { block } = bem('TabsBar', styles);

export function TabsBar<T = string | number>(props: Props<T>) {
    const { activeTabId, children, onSelect, isBlock, ...rest } = props;

    const extendWithProps = (tab: Props<T>['children'] | null) => {
        if (React.isValidElement(tab) && tab.type === TabItem) {
            const { tabId } = tab.props;
            const extendProps: PropsToPassToChild<T> = { isBlock };
            if (activeTabId) {
                extendProps.isActive = tabId === activeTabId;
            }
            if (onSelect) {
                extendProps.onSelect = onSelect;
            }

            return React.cloneElement(tab, extendProps);
        }
        return tab;
    };

    return (
        <div {...rest} {...block(props)} role="tablist">
            {activeTabId || onSelect || isBlock
                ? React.Children.map(children, (tab) => extendWithProps(tab))
                : children}
        </div>
    );
}

TabsBar.displayName = 'TabsBar';

TabsBar.defaultProps = {
    isBlock: false,
    activeTabId: undefined,
    onSelect: undefined,
};
