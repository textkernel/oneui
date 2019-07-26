import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Text.scss';
import { SIZES, CONTEXTS } from '../../constants';

const { block } = bem({
    name: 'Text',
    classnames: styles,
    propsToMods: ['context', 'size'],
});

const Text = props => {
    const { children, context, inline, size, ...rest } = props;
    const HtmlNodeType = inline ? 'span' : 'p';

    return (
        <HtmlNodeType {...rest} {...block(props)}>
            {children}
        </HtmlNodeType>
    );
};

Text.displayName = 'Text';

Text.propTypes = {
    /** Text content */
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    /** Text should be rendered inline */
    inline: PropTypes.bool,
    /** The context of the text, effecting its color (e.g. brand, primary, bad, good etc. 'muted' added as special context here) */
    context: PropTypes.oneOf([...CONTEXTS, 'muted', 'default']),
    /** Custom text sizes */
    size: PropTypes.oneOf(SIZES),
};

Text.defaultProps = {
    inline: false,
    context: 'default',
    size: 'normal',
};

export default Text;
