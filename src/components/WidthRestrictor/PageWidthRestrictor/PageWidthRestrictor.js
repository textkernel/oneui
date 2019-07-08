import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './PageWidthRestrictor.scss';

const { block } = bem({
    name: 'PageWidthRestrictor',
    classnames: styles
});

const PageWidthRestrictor = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            {children}
        </div>
    );
};

PageWidthRestrictor.displayName = 'PageWidthRestrictor';

PageWidthRestrictor.propTypes = {
    /** Node(s) to be rendered inside the container */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

export default PageWidthRestrictor;
