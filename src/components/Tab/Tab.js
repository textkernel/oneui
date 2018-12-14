import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Tab.scss';

const { block } = bem({
    name: 'Tab',
    classnames: styles,
    propsToMods: []
});

const Tab = props => {
    const { children, href, id, label, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

Tab.propTypes = {
    /** The tab content */
    children: PropTypes.node.isRequired,
    /** URL / route for this tab */
    href: PropTypes.string,
    /** Unique ID for this tab */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /** Label for this tab */
    label: PropTypes.node.isRequired
};

Tab.defaultProps = {
    href: '#'
};

export default Tab;
