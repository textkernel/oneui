import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Header.scss';

const { block, elem } = bem({
    name: 'Header',
    classnames: styles
});

const Header = props => {
    const { logoSrc, logoLink, logoTitle, children, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('wrapper', props)}>
                <a href={logoLink}>
                    <img src={logoSrc} alt={logoTitle} {...elem('logo', props)} />
                </a>
                <div {...elem('menu', props)}>{children}</div>
            </div>
        </div>
    );
};

Header.displayName = 'Header';

Header.propTypes = {
    /** path to the logo source file */
    logoSrc: PropTypes.string.isRequired,
    /** path to where the logo should link to if clicked */
    logoLink: PropTypes.string,
    /** a name for the logo, it will used as alternative text to the img */
    logoTitle: PropTypes.string,
    /** Node(s) to be rendered on the right side of the header */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Header.defaultProps = {
    logoLink: '/',
    logoTitle: 'website logo',
    children: null
};

export default Header;
