import * as React from 'react';
import bem from '../../../utils/bem';
import { TabItem, TabItemProps } from '../TabItem';
import styles from './TabsBar.scss';

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Id of currently active tab. This will overwrite isActive on the children */
    activeTabId?: string | number;
    /** The tabs */
    children: React.ReactElement<TabItemProps> | React.ReactElement<TabItemProps>[];
    /** Callback function, fired when switching tabs by clicking. This will overwrite onSelect on children, if defined */
    onSelect?: (selectedTabId: number | string) => void;
    /** to render the tabs so they cover the full width of the available space */
    isBlock?: boolean;
}

interface PropsToPassToChild {
    isActive?: boolean;
    onSelect?: Props['onSelect'];
    isBlock?: Props['isBlock'];
}

const { block } = bem('TabsBar', styles);

const TabsBar: React.FC<Props> = props => {
    const { activeTabId, children, onSelect, isBlock, ...rest } = props;

    const extendWithProps = (tab: Props['children']) => {
        if (React.isValidElement(tab) && tab.type === TabItem) {
            const { tabId } = tab.props;
            const extendProps: PropsToPassToChild = { isBlock };
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
                ? React.Children.map(children, tab => extendWithProps(tab))
                : children}
        </div>
    );
};

TabsBar.displayName = 'TabsBar';

TabsBar.defaultProps = {
    isBlock: false,
};

export default TabsBar;
