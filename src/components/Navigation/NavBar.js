import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './NavBar.scss';

const { block, elem } = bem({
    name: 'NavBar',
    classnames: styles
});

const NavBar = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <nav {...elem('wrapper', props)}>{children}</nav>
        </div>
    );
};

NavBar.displayName = 'NavBar';

NavBar.propTypes = {
    /** Node(s) to be rendered as navigation. They are expeted to be NavItem */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

NavBar.defaultProps = {
    children: null
};

export default NavBar;
