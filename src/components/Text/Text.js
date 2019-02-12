import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Text.scss';
import { SIZES } from '../../constants';

const { block } = bem({
    name: 'Text',
    classnames: styles,
    propsToMods: ['bold', 'muted', 'size']
});

const Text = props => {
    const { bold, children, inline, size, ...rest } = props;
    const HtmlNodeType = inline ? 'span' : 'p';

    return (
        <HtmlNodeType {...rest} {...block(props)}>
            {children}
        </HtmlNodeType>
    );
};

Text.displayName = 'Text';

Text.propTypes = {
    /** Text should be bold */
    bold: PropTypes.bool,
    /** Text content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** Text should be rendered inline */
    inline: PropTypes.bool,
    /** Render muted (auxiliary) text */
    muted: PropTypes.bool,
    /** Custom text sizes */
    size: PropTypes.oneOf(SIZES)
};

Text.defaultProps = {
    bold: false,
    inline: false,
    muted: false,
    size: 'normal'
};

export default Text;
