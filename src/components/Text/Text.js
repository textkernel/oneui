import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Text.scss';

const { block } = bem({
    name: 'Text',
    classnames: styles,
    propsToMods: ['muted']
});

const Text = props => {
    const { children, inline, ...rest } = props;
    const HtmlNodeType = inline ? 'span' : 'p';

    return (
        <HtmlNodeType {...rest} {...block(props)}>
            {children}
        </HtmlNodeType>
    );
};

Text.displayName = 'Text';

Text.propTypes = {
    /** Text should be rendered inline */
    inline: PropTypes.bool,
    /** Render muted (auxiliary) text */
    muted: PropTypes.bool,
    /** Text content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
};

Text.defaultProps = {
    inline: false,
    muted: false
};

export default Text;
