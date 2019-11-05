import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../../utils/bem';
import styles from './NavItem.scss';

const { block, elem } = bem('NavItem', styles);

const NavItem = props => {
    const { active, pullRight, useActiveClass, children, ...rest } = props;
    const ariaProp = active ? { 'aria-current': 'page' } : {};
    const newProps = { ...ariaProp, ...rest, ...block(props) };
    if (useActiveClass) {
        newProps.activeClassName = elem('active', props).className;
    }

    try {
        React.Children.only(children);
    } catch {
        throw new Error('NavItem should have a single child only');
    }

    return React.cloneElement(children, newProps);
};

NavItem.displayName = 'NavItem';

NavItem.propTypes = {
    /** Add active class to the item. For controlled components */
    active: PropTypes.bool,
    /** If set to true, this item will be pulled to the right. Only one NavItem inside a nav bar should have this attribute */
    pullRight: PropTypes.bool,
    /** add activeClassName to the rendered item. You should add this to react-routers NavLink */
    useActiveClass: PropTypes.bool,
    /** Node to be rendered as a single navigation item. There should be only 1 child */
    children: PropTypes.node,
};

NavItem.defaultProps = {
    active: false,
    pullRight: false,
    useActiveClass: false,
    children: null,
};

export default NavItem;
