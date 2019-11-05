import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../../utils/bem';
import styles from './TabItem.scss';

const { block } = bem('TabItem', styles);

const TabItem = props => {
    const { href, isActive, label, ...rest } = props;
    return (
        <a
            href={href || '#'}
            tabIndex={0}
            {...rest}
            {...block(props)}
            role="tab"
            aria-selected={isActive}
        >
            {label}
        </a>
    );
};

TabItem.displayName = 'TabItem';

TabItem.propTypes = {
    /** Label for this tab */
    label: PropTypes.node.isRequired,
    /** Renders an active tab */
    isActive: PropTypes.bool,
};

TabItem.defaultProps = {
    isActive: false,
};

export default TabItem;
