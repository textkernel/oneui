import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Chip.scss';

const { block } = bem({
    name: 'Chip',
    classnames: styles
});

const Chip = props => {
    const { children, title, ...rest } = props;

    return (
        <span title={title} {...rest} {...block(props)}>
            {children}
        </span>
    );
};

Chip.displayName = 'Chip';

Chip.propTypes = {
    /** The content of the chip: it is expected to be short text possibly accompanied by an icon */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** Text for title chip that shows up when it is hovered for a few seconds */
    title: PropTypes.string
};

Chip.defaultProps = {
    title: null
};

export default Chip;
