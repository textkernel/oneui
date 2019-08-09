import React from 'react';
import bem from '../../..';
import styles from './styles.json';

const { block, elem } = bem({
    name: 'List',
    classnames: styles,
});

const List = props => (
    <ul {...block(props)}>
        {React.Children.map(props.children, child =>
            child ? React.cloneElement(child, elem('item', props)) : null
        )}
    </ul>
);

List.displayName = 'List';

export default List;
