import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './List.scss';

const { block, elem } = bem({
    name: 'List',
    classnames: styles,
    propsToMods: ['isDivided', 'Component']
});

const List = props => {
    const { children, Component, isDivided, ...rest } = props;
    return (
        <Component {...rest} {...block(props)}>
            {React.Children.map(children, child => React.cloneElement(child, elem('item', props)))}
        </Component>
    );
};

List.displayName = 'List';

List.propTypes = {
    /** List Items */
    children: PropTypes.node,
    /** The HTML or React component to be used to render the list  */
    Component: PropTypes.oneOf(['ul', 'ol', 'menu']),
    /** Adds dividing lines between the list items */
    isDivided: PropTypes.bool
};

List.defaultProps = {
    children: null,
    Component: 'ul',
    isDivided: false
};

export default List;
