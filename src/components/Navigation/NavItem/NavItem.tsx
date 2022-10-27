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
    /** React-Router version to determine how to handle useActiveClass */
    routerVersion?: 5 | 6;
    /** Node to be rendered as a single navigation item. There should be only 1 child */
    children: React.ReactElement;
}

interface ChildProps extends Omit<Props, 'className' | 'children' | 'aria-current'> {
    className?: string | (({ isActive }: { isActive: boolean }) => string);
    activeClassName?: string;
    'aria-current'?: string | boolean;
    ref: React.ForwardedRef<HTMLElement>;
}

const { block, elem } = bem('NavItem', styles);

/**
 * NavItem supports React-Router's NavLink as a child. It makes sure we pass the correct class both
 * in Active and Inactive states. Since the API for this changed between version 5 and 6, now you need to
 * specify which router version you are using.
 * For technical reasons only the usage of version 6 is demonstrated in storybook
 */
export const NavItem = React.forwardRef<HTMLElement, Props>((props, ref) => {
    const { active, pullRight, useActiveClass, routerVersion = 5, children, ...rest } = props;
    const ariaProp = active ? { 'aria-current': 'page' } : {};
    const newProps: ChildProps = { ...ariaProp, ...rest, ref };
    if (!useActiveClass) {
        newProps.className = block(props).className;
    } else {
        if (routerVersion === 5) {
            newProps.className = block(props).className;
            newProps.activeClassName = elem('active', props).className;
        } else {
            const activeClass = elem('active', props).className as string;
            newProps.className = ({ isActive }) => {
                const classArr: string[] = [block(props).className];
                if (isActive) {
                    classArr.push(activeClass);
                }
                return classArr.join(' ');
            };
        }
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
    routerVersion: 5,
};
