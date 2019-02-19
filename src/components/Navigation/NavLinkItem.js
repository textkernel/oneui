import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './NavItem.scss';

const { block, elem } = bem({
    name: 'NavItem',
    classnames: styles,
    propsToMods: ['pullRight']
});

const NavLinkItem = props => {
    const { pullRight, children, ...rest } = props;

    return (
        <NavLink {...rest} {...block(props)} activeClassName={{ ...elem('active', props) }}>
            {children}
        </NavLink>
    );
};

NavLinkItem.displayName = 'NavLinkItem';

NavLinkItem.propTypes = {
    /** If set to true, this item will be pulled to the right. Only one NavItem inside a nav bar should have this attribute */
    pullRight: PropTypes.bool,
    /** Node to be rendered a single navigation item */
    children: PropTypes.string
};

NavLinkItem.defaultProps = {
    pullRight: false,
    children: null
};

export default NavLinkItem;
