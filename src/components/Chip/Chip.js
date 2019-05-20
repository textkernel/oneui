import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Chip.scss';

const { block } = bem({
    name: 'Chip',
    classnames: styles
});

const Chip = props => {
    const { children, ...rest } = props;

    return (
        <span {...rest} {...block(props)}>
            {children}
        </span>
    );
};

Chip.displayName = 'Chip';

Chip.propTypes = {
    /** The content of the chip: it is expected to be short text possibly accompanied by an icon */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default Chip;
