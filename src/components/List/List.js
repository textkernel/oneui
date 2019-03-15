import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './List.scss';

const { block } = bem({
    name: 'List',
    classnames: styles,
    propsToMods: ['isDividedList', 'Component']
});

const List = props => {
    const { children, Component, isDividedList, ...rest } = props;
    return (
        <Component {...rest} {...block(props)}>
            {React.Children.map(children, child => React.cloneElement(child, { isDividedList }))}
        </Component>
    );
};

List.displayName = 'List';

List.propTypes = {
    /** List Items */
    children: PropTypes.node,
    /** The HTML or React component to be used to render the list  */
    Component: PropTypes.string,
    /** Adds dividing lines between the list items */
    isDividedList: PropTypes.bool
};

List.defaultProps = {
    children: null,
    Component: 'ul',
    isDividedList: false
};

export default List;
