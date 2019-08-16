import React from 'react';
import bem from '../../..';
import styles from './styles.json';

const { block, elem } = bem({
    name: 'List',
    classnames: styles,
});

const List = props => {
    const { children } = props;
    return (
        <ul {...block(props)}>
            {React.Children.map(children, child =>
                child ? React.cloneElement(child, elem('item', props, child.props.className)) : null
            )}
        </ul>
    );
};

List.displayName = 'List';

export default List;
