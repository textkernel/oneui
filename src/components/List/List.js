import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import ListItem from './ListItem';
import styles from './List.scss';

const { block, elem } = bem({
    name: 'List',
    classnames: styles,
    propsToMods: ['isDivided']
});

const List = React.forwardRef((props, ref) => {
    const { children, isDivided, ...rest } = props;
    return (
        <ul {...rest} ref={ref} {...block(props)}>
            {React.Children.map(children, child =>
                child ? React.cloneElement(child, elem('item', props)) : null
            )}
        </ul>
    );
});

List.displayName = 'List';

List.propTypes = {
    /** List items */
    children: (props, propName, componentName) => {
        const prop = props[propName];

        let error = null;
        React.Children.forEach(prop, child => {
            if (child && child.type !== ListItem && child.type !== 'li') {
                error = new Error(
                    `'${componentName}' children should be of type 'ListItem' or 'li'.`
                );
            }
        });
        return error;
    },
    /** Adds dividing lines between the list items */
    isDivided: PropTypes.bool
};

List.defaultProps = {
    children: null,
    isDivided: false
};

export default List;
