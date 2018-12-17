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
    const { checkbox, children, disabled, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {!!checkbox && <input type="checkbox" />}
            {children}
        </div>
    );
};

DropdownItem.propTypes = {
    checkbox: PropTypes.bool,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

DropdownItem.defaultProps = {
    checkbox: false,
    disabled: false,
    value: null
};

export default DropdownItem;
