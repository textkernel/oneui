import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Header.scss';

const { block, elem } = bem({
    name: 'Header',
    classnames: styles
});

const Header = props => {
    const { logo, children, ...rest } = props;

    const simpleLogo = logo.link ? (
        <a href={logo.link}>
            <img src={logo.src} alt={logo.title} {...elem('logo', props)} />
        </a>
    ) : (
        <img src={logo.src} alt={logo.title || 'our logo'} {...elem('logo', props)} />
    );

    const renderedLogo = logo.src
        ? simpleLogo
        : React.cloneElement(logo, { ...elem('logo', props) });

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('wrapper', props)}>
                {renderedLogo}
                <div {...elem('menu', props)}>{children}</div>
            </div>
        </div>
    );
};

Header.displayName = 'Header';

Header.propTypes = {
    /** supply a logo ready to be rendered or attributes to build a simple one. */
    logo: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.shape({
            /** path to the logo source file */
            src: PropTypes.string.isRequired,
            /** path to where the logo should link to if clicked */
            link: PropTypes.string,
            /** a name for the logo, it will used as alternative text to the img */
            title: PropTypes.string
        })
    ]).isRequired,
    /** Node(s) to be rendered on the right side of the header */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Header.defaultProps = {
    children: null
};

export default Header;
