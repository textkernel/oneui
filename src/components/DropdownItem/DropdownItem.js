import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Checkbox from '../Checkbox';
import styles from './DropdownItem.scss';

const { block } = bem({
    name: 'DropdownItem',
    classnames: styles,
    propsToMods: ['disabled', 'isStatic']
});

const DropdownItem = props => {
    const { checkbox, children, disabled, isStatic, ...rest } = props;

    if (checkbox) {
        return (
            <div {...rest} {...block(props)}>
                <Checkbox disabled={ disabled }>
                    {children}
                </Checkbox>
            </div>
        );
    }

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

DropdownItem.propTypes = {
    checkbox: PropTypes.bool,
    /** Item label */
    children: PropTypes.node.isRequired,
    /** Whether the item is disabled */
    disabled: PropTypes.bool,
    /** Callback function, fired when item is clicked */
    onClick: PropTypes.func,
    /** If true, this item is not meant for user interaction */
    isStatic: PropTypes.bool,
    /** Selected value of this item */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

DropdownItem.defaultProps = {
    checkbox: false,
    disabled: false,
    onClick: null,
    isStatic: false,
    value: null
};

export default DropdownItem;
