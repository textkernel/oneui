import React, { cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import bem from '../../../utils/bem';
import styles from './TabMenu.scss';

const { block } = bem('TabMenu', styles);

const TabMenu = props => {
    const { activeTabId, children, gutters, onChange, ...rest } = props;
    return (
        <div {...rest} {...block(props)} role="tablist">
            {Children.map(children, tab => {
                const { id } = tab.props;
                return cloneElement(tab, {
                    isActive: id === activeTabId,
                    onClick: event => onChange(event, id),
                });
            })}
        </div>
    );
};

TabMenu.displayName = 'TabMenu';

TabMenu.propTypes = {
    /** Id of currently active tab */
    activeTabId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** The tab items */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /** Have gutters (white space) on both sides of tab menu */
    gutters: PropTypes.bool,
    /** Callback function for when changing tabs */
    onChange: PropTypes.func,
};

TabMenu.defaultProps = {
    children: null,
    gutters: false,
    onChange: null,
};

export default TabMenu;
