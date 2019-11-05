import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../utils/bem';
import styles from './Heading.scss';
import { HEADING_SIZES } from '../../constants';

const { block } = bem('Heading', styles);

const Heading = props => {
    const { align, children, level, ...rest } = props;
    const HtmlNodeType = level;

    return (
        <HtmlNodeType {...rest} {...block(props)}>
            {children}
        </HtmlNodeType>
    );
};

Heading.displayName = 'Heading';

Heading.propTypes = {
    /** Heading text alignment */
    align: PropTypes.oneOf(['left', 'center', 'right']),
    /** Heading text */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** Heading size (h1, h2, ...) */
    level: PropTypes.oneOf(HEADING_SIZES),
};

Heading.defaultProps = {
    align: 'left',
    level: 'h1',
};

export default Heading;
