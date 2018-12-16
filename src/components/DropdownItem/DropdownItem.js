import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../packages/bem';
import styles from './DropdownItem.scss';

const { block } = bem({
    name: 'DropdownItem',
    classnames: styles,
    propsToMods: []
});

const DropdownItem = props => {
    const { children, ...rest } = props;

    return (
        <a href="#" {...rest} {...block(props)}>
            { children }
        </a>
    );
};

DropdownItem.propTypes = {
    children: PropTypes.node.isRequired
};

DropdownItem.defaultProps = {};

export default DropdownItem;
