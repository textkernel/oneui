import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Text from '../../Text';
import styles from './ListItem.scss';

const { block, elem } = bem({
    name: 'ListItem',
    classnames: styles,
    propsToMods: ['isSelected', 'onClick', 'disabled']
});

const ListItem = props => {
    const { children, isSelected, onClick, disabled, ...rest } = props;
    const customBlockMod = { clickable: typeof onClick === 'function' };

    return (
        <li {...rest} {...block(props, customBlockMod)}>
            <div onClick={onClick} role="presentation" {...elem('container', props)}>
                {React.Children.map(
                    children,
                    child => (typeof child === 'string' ? <Text inline>{child}</Text> : child)
                )}
            </div>
        </li>
    );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
    /** List Items */
    children: PropTypes.node,
    /** A function to be called if the item is clicked */
    onClick: PropTypes.func,
    /** Formats this item as selected  */
    isSelected: PropTypes.bool,
    /** Format this item as disabled */
    disabled: PropTypes.bool
};

ListItem.defaultProps = {
    children: null,
    isSelected: false,
    onClick: null,
    disabled: false
};

export default ListItem;
