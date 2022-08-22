import * as React from 'react';
import { bem } from '../../../utils';
import styles from './NavItem.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    /** Add active class to the item. For controlled components */
    active?: boolean;
    /** If set to true, this item will be pulled to the right. Only one NavItem inside a nav bar should have this attribute */
    pullRight?: boolean;
    /** add activeClassName to the rendered item. You should add this to react-routers NavLink */
    useActiveClass?: boolean;
    /** Node to be rendered as a single navigation item. There should be only 1 child */
    children: React.ReactElement;
}

const { block, elem } = bem('NavItem', styles);

export const NavItem = React.forwardRef<HTMLElement, Props>((props, ref) => {
    const { active, pullRight, useActiveClass, children, ...rest } = props;
    const ariaProp = active ? { 'aria-current': 'page' } : {};
    const newProps = { ...ariaProp, ...rest, ...block(props), ref };
    if (useActiveClass) {
        newProps.activeClassName = elem('active', props).className;
    }

    try {
        React.Children.only(children);
    } catch {
        throw new Error('NavItem should have a single child only');
    }

    return React.cloneElement(children, newProps);
});

NavItem.displayName = 'NavItem';

NavItem.defaultProps = {
    active: false,
    pullRight: false,
    useActiveClass: false,
};
