import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './BlockWidthRestrictor.scss';

const { block } = bem({
    name: 'BlockWidthRestrictor',
    classnames: styles,
});

const BlockWidthRestrictor = props => {
    const { children, As, ...rest } = props;

    return (
        <As {...rest} {...block(props)}>
            {children}
        </As>
    );
};

BlockWidthRestrictor.displayName = 'BlockWidthRestrictor';

BlockWidthRestrictor.propTypes = {
    /** Node(s) to be rendered inside the container */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** HTML tag to be used to render the container */
    As: PropTypes.string,
};

BlockWidthRestrictor.defaultProps = {
    As: 'div',
};

export default BlockWidthRestrictor;
