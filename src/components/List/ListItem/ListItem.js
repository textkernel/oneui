import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Text from '../../Text';
import styles from './ListItem.scss';

const { block, elem } = bem({
    name: 'ListItem',
    classnames: styles,
    propsToMods: ['isDivided', 'isDividedList', 'isSelected', 'onClick']
});

const ListItem = props => {
    const { children, isDivided, isDividedList, isSelected, onClick, ...rest } = props;
    const customBlockMod = { clickable: typeof onClick === 'function' };

    return (
        <li {...rest} {...block(props, customBlockMod)}>
            <div onClick={onClick} role="presentation" {...elem('container', props)}>
                {React.Children.map(
                    children,
                    child => (typeof child === 'string' ? <Text>{child}</Text> : child)
                )}
            </div>
        </li>
    );
};

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
    /** List Items */
    children: PropTypes.node,
    /** Formats this item as selected  */
    isSelected: PropTypes.bool,
    /** Adds a dividing line below the items. Do not use on divided lists */
    isDivided: PropTypes.bool,
    /** For internal use: adds a dividing line below all items but the last. isDivided set to true will overwrite this param */
    isDividedList: PropTypes.bool,
    /** A function to be called if the item is clicked */
    onClick: PropTypes.func
};

ListItem.defaultProps = {
    children: null,
    isSelected: false,
    isDivided: false,
    isDividedList: false,
    onClick: null
};

export default ListItem;
