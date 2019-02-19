import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './DropdownContent.scss';

const { block } = bem({
    name: 'DropdownContent',
    classnames: styles,
    propsToMods: ['shown']
});

const DropdownContent = props => {
    const { children } = props;

    return <div {...block(props)}>{children}</div>;
};

DropdownContent.displayName = 'DropdownContent';

DropdownContent.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    shown: PropTypes.bool
};

DropdownContent.defaultProps = {
    children: null,
    shown: false
};

export default DropdownContent;
