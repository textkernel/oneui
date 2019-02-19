import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './NavItem.scss';

const { block } = bem({
    name: 'NavItem',
    classnames: styles,
    propsToMods: ['active', 'pullRight']
});

const NavItem = props => {
    const { active, pullRight, children, ...rest } = props;

    return (
        <a {...rest} {...block(props)}>
            {children}
        </a>
    );
};

NavItem.displayName = 'NavItem';

NavItem.propTypes = {
    /** If set to true, this item will be pulled to the right. Only one NavItem inside a nav bar should have this attribute */
    pullRight: PropTypes.bool,
    /** Node to be rendered a single navigation item */
    children: PropTypes.string
};

NavItem.defaultProps = {
    pullRight: false,
    children: null
};

export default NavItem;
