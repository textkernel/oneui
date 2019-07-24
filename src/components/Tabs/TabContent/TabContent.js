import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './TabContent.scss';

const { block } = bem({
    name: 'TabContent',
    classnames: styles,
    propsToMods: [],
});

const TabContent = props => {
    const { children, ...rest } = props;
    return (
        <div {...rest} {...block(props)} role="tabpanel">
            {children}
        </div>
    );
};

TabContent.displayName = 'TabContent';

TabContent.propTypes = {
    /** Content for this tab */
    children: PropTypes.node.isRequired,
};

export default TabContent;
