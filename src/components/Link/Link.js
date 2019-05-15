import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { CONTEXTS } from '../../constants';
import styles from './Link.scss';

const { block } = bem({
    name: 'Link',
    classnames: styles,
    propsToMods: ['context']
});

const Link = props => {
    const { children, context, ...rest } = props;
    return (
        <a {...rest} {...block(props)}>
            {children}
        </a>
    );
};

Link.displayName = 'Link';

Link.propTypes = {
    /** The spinner context (e.g. brand, primary, bad, good etc.) */
    context: PropTypes.oneOf(['default', 'muted', ...CONTEXTS]),
    /** Link content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

Link.defaultProps = {
    context: 'default'
};

export default Link;
