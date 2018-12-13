import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem'; // eslint-disable-line import/no-unresolved
import styles from './Heading.scss';
import { HEADING_SIZES } from '../../constants';

const { block } = bem({
    name: 'Heading',
    classnames: styles,
    propsToMods: ['alignRight', 'level']
});

const Heading = props => {
    const { alignRight, children, level, ...rest } = props;
    const HtmlNodeType = `h${level}`;

    return (
        <HtmlNodeType {...rest} {...block(props)}>
            {children}
        </HtmlNodeType>
    );
};

Heading.propTypes = {
    /** Indicates that heading text should be right-aligned */
    alignRight: PropTypes.bool,
    /** Heading text */
    children: PropTypes.string.isRequired,
    /** Heading size (h1, h2, ...) */
    level: PropTypes.oneOf(HEADING_SIZES)
};

Heading.defaultProps = {
    alignRight: false,
    level: 1
};

export default Heading;
