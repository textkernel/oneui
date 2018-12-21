import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './TabMenu.scss';

const { block } = bem({
    name: 'TabMenu',
    classnames: styles,
    propsToMods: ['gutters']
});

const TabMenu = props => {
    const { children, gutters, ...rest } = props;
    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

TabMenu.propTypes = {
    /** The tab items */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /** Have gutters (white space) on both sides of tab menu */
    gutters: PropTypes.bool
};

TabMenu.defaultProps = {
    children: null,
    gutters: false
};

export default TabMenu;
