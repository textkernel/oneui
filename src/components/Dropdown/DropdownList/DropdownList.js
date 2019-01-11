import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './DropdownList.scss';

const { block } = bem({
    name: 'DropdownList',
    classnames: styles,
    propsToMods: ['animated', 'fromRight', 'shown']
});

const DropdownList = forwardRef((props, ref) => {
    const { animated, children, fromRight, shown, ...rest } = props;

    if (!shown) {
        return null;
    }

    return (
        <div {...rest} {...block(props)} ref={ref}>
            {children}
        </div>
    );
});

DropdownList.propTypes = {
    /** The dropdown list content */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /** If the list should be aligned alongside the right edge of the parent element */
    fromRight: PropTypes.bool,
    /** If the list should be visible */
    shown: PropTypes.bool
};

DropdownList.defaultProps = {
    children: null,
    fromRight: false,
    shown: false
};

export default DropdownList;
