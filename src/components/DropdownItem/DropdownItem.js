import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './DropdownItem.scss';

const { block } = bem({
    name: 'DropdownItem',
    classnames: styles,
    propsToMods: ['disabled']
});

const DropdownItem = props => {
    const { children, disabled, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

DropdownItem.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool
};

DropdownItem.defaultProps = {
    disabled: false
};

export default DropdownItem;
