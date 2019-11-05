import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../utils/bem';
import styles from './Link.scss';

const { block } = bem('Link', styles);

const Link = props => {
    const { children, ...rest } = props;
    return (
        <a {...rest} {...block(props)}>
            {children}
        </a>
    );
};

Link.displayName = 'Link';

Link.propTypes = {
    /** Link content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Link;
