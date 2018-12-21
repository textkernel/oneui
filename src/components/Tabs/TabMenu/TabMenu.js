import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './TabMenu.scss';

const { block } = bem({
    name: 'TabMenu',
    classnames: styles,
    propsToMods: []
});

const TabMenu = props => {
    const { children, ...rest } = props;
    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

TabMenu.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

TabMenu.defaultProps = {
    children: null
};

export default TabMenu;
