import * as React from 'react';
import PropTypes from 'prop-types';
import { bem } from '../../../utils/bem';
import { Text } from '../../Text';
import { CONTEXTS } from '../../../constants';
import styles from './ListItem.scss';

const { block, elem } = bem('ListItem', styles);

export const ListItem = React.forwardRef((props, ref) => {
    const {
        children,
        isSelected,
        isHighlighted,
        onClick,
        disabled,
        highlightContext,
        ...rest
    } = props;
    const customBlockMod = { clickable: typeof onClick === 'function' };

    return (
        <li {...rest} ref={ref} {...block({ ...props, ...customBlockMod })}>
            <div onClick={onClick} role="presentation" {...elem('container', props)}>
                {React.Children.map(children, child =>
                    typeof child === 'string' ? <Text inline>{child}</Text> : child
                )}
            </div>
        </li>
    );
});

ListItem.displayName = 'ListItem';

ListItem.propTypes = {
    /** List Items */
    children: PropTypes.node,
    /** A function to be called if the item is clicked */
    onClick: PropTypes.func,
    /** Formats this item as selected  */
    isSelected: PropTypes.bool,
    /** Formats this item as selected  */
    isHighlighted: PropTypes.bool,
    /** Format this item as disabled */
    disabled: PropTypes.bool,
    /** formatting context when hovered or selected */
    highlightContext: PropTypes.oneOf([...CONTEXTS, 'default']),
};

ListItem.defaultProps = {
    children: null,
    onClick: null,
    isSelected: false,
    isHighlighted: false,
    disabled: false,
    highlightContext: 'default',
};
