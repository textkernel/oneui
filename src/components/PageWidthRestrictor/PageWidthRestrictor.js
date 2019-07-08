import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './PageWidthRestrictor.scss';

const { block } = bem({
    name: 'PageWidthRestrictor',
    classnames: styles
});

const PageWidthRestrictor = props => {
    const { children, As, ...rest } = props;

    return (
        <As {...rest} {...block(props)}>
            {children}
        </As>
    );
};

PageWidthRestrictor.displayName = 'PageWidthRestrictor';

PageWidthRestrictor.propTypes = {
    /** Node(s) to be rendered inside the container */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** HTML tag to be used to render the container */
    As: PropTypes.string
};

PageWidthRestrictor.defaultProps = {
    As: 'div'
};

export default PageWidthRestrictor;
