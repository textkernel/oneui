import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import PageWidthRestrictor from '../../PageWidthRestrictor';
import styles from './NavBar.scss';

const { block, elem } = bem({
    name: 'NavBar',
    classnames: styles
});

const NavBar = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <PageWidthRestrictor As="nav" {...elem('wrapper', props)}>
                {children}
            </PageWidthRestrictor>
        </div>
    );
};

NavBar.displayName = 'NavBar';

NavBar.propTypes = {
    /** Node(s) to be rendered as navigation */
    children: PropTypes.node
};

NavBar.defaultProps = {
    children: null
};

export default NavBar;
