import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../../utils/bem';
import { BlockWidthRestrictor } from '../../WidthRestrictor';
import styles from './NavBar.scss';

const { block, elem } = bem('NavBar', styles);

const NavBar = props => {
    const { children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <BlockWidthRestrictor As="nav" {...elem('wrapper', props)}>
                {children}
            </BlockWidthRestrictor>
        </div>
    );
};

NavBar.displayName = 'NavBar';

NavBar.propTypes = {
    /** Node(s) to be rendered as navigation */
    children: PropTypes.node,
};

NavBar.defaultProps = {
    children: null,
};

export default NavBar;
