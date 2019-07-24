import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { BlockWidthRestrictor } from '../WidthRestrictor';
import styles from './Footer.scss';
import { LogoTextkernel } from '../Icon';

const { block, elem } = bem({
    name: 'Footer',
    classnames: styles,
});

const Footer = props => {
    const { copyright, children, ...rest } = props;

    const tkCopyright = (
        <span>
            {`\u00a9 ${new Date().getFullYear()} `}
            <LogoTextkernel {...elem('logo', props)} margin="left" />
        </span>
    );

    return (
        <footer {...rest} {...block(props)}>
            <BlockWidthRestrictor {...elem('wrapper', props)}>
                {copyright || tkCopyright}
                <div {...elem('menu', props)}>{children}</div>
            </BlockWidthRestrictor>
        </footer>
    );
};

Footer.displayName = 'Footer';

Footer.propTypes = {
    /** supply copyright text ready to be rendered instead of the default one */
    copyright: PropTypes.node,
    /** Node(s) to be rendered on the right side of the header */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Footer.defaultProps = {
    copyright: null,
    children: null,
};

export default Footer;
