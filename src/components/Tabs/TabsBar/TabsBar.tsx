import * as React from 'react';
import type { EmptyElement } from '@textkernel/oneui/customTypes/types';
import { bem } from '../../../utils';
import { TabItem, TabItemProps } from '../TabItem';
import styles from './TabsBar.scss';

export interface Props<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Id of currently active tab. This will overwrite isActive on the children */
    activeTabId?: T;
    /** The tabs */
    children:
        | React.ReactElement<TabItemProps<T>>
        | (React.ReactElement<TabItemProps<T>> | EmptyElement)[];
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

/**
 * Tabs organize related content, enabling users to switch between different groups of
 * information within the same context.
 *
 * ## Usage
 *
 * Tabs group different yet related content, allowing users to navigate views without
 * leaving the page. They can be used in full-page layouts or within components such as modals,
 * cards, or side panels.
 *
 * To minimize cognitive load, use tabs to categorize related information. Tabs can organize content
 * like forms, settings, and dashboards, ensuring users don't have to leave their workflow
 * to complete tasks.
 *
 * ## Anatomy
 *
 * The tab component has two distinct zones: selected and unselected. One tab is always selected by default.
 *
 * `image to be inserted`
 *
 * ## Auto-width
 *
 * Each tab varies in size based on the label's character count but maintains consistent padding
 * on each side of the label. The first label, selected by default, should align with the grid.
 * The endpoint of the tabs may vary and might not align with the grid. Use a line to help balance
 * the tabs with other components on the page if necessary.
 *
 * `image to be inserted`
 *
 * ## Main elements
 *
 * ### Labels
 *
 * Use short, clear, and specific tab labels. Labels should be one to two words for easier scanning.
 * Text labels should clearly communicate the view users will see and the content contained in the view.
 *
 * ### States
 *
 * Tabs have two main states: active and inactive. Other interactive states include hover, focus,
 * and disabled. By default, one tab is preselected, typically the first tab. Only one tab can be
 * selected at a time. When a new tab is chosen, the previous tab is automatically deselected. If a
 * user navigates away from a tab, it remains selected until the user changes it.
 *
 * | State | #### When to use |
 * | ---------- | ---------------- |
 * | Inactive | The previously active tab becomes inactive when the user navigates to another tab. |
 * | Focus | When a user clicks on the tab or navigates using the keyboard with the left and right arrows, it becomes focused, indicating successful navigation to the component. |
 * | Hover | When a user hovers over a tab with the mouse cursor to interact with it. |
 * | Active | The tab is active when a user clicks or uses the arrow keys. |
 * | Disabled | When a user cannot interact with the tab due to permissions, dependencies, or prerequisites, it enters a disabled state. This state removes all interactivity from the component. The styling of disabled tabs is not subject to WCAG contrast compliance. |
 *
 */
export function TabsBar<T = string | number>({
    activeTabId = undefined,
    children,
    onSelect = undefined,
    isBlock = false,
    ...rest
}: Props<T>) {
    const extendWithProps = (tab: Props<T>['children'] | EmptyElement) => {
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
        <div {...rest} {...block({ isBlock, ...rest })} role="tablist">
            {activeTabId || onSelect || isBlock
                ? React.Children.map(children, (tab) => extendWithProps(tab))
                : children}
        </div>
    );
}

TabsBar.displayName = 'TabsBar';
