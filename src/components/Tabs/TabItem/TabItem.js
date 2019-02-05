import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './TabItem.scss';

const { block } = bem({
    name: 'TabItem',
    classnames: styles,
    propsToMods: ['isActive']
});

const TabItem = props => {
    const { href, isActive, label, ...rest } = props;
    return (
        <a href={href || '#'} {...rest} {...block(props)}>
            {label}
        </a>
    );
};

TabItem.displayName = 'TabItem';

TabItem.propTypes = {
    /** Label for this tab */
    label: PropTypes.node.isRequired,
    /** Renders an active tab */
    isActive: PropTypes.bool
};

TabItem.defaultProps = {
    isActive: false
};

export default TabItem;
