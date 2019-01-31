import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Icon.scss';
import { CONTEXTS, ICONS } from '../../constants';

const { block, elem } = bem({
    name: 'Icon',
    classnames: styles,
    propsToMods: ['alignWithText', 'context']
});

const Icon = props => {
    const { context, name, size, title, ...rest } = props;

    const currentIcon = ICONS[name];
    const correctedSize = Math.max(0, size);

    return (
        <div {...rest} {...block(props)}>
            <svg
                {...elem('svg', props)}
                xmlns="http://www.w3.org/2000/svg"
                width={correctedSize}
                height={correctedSize}
                viewBox={currentIcon.viewBox}
                aria-labelledby="title"
            >
                {!!title && <title>{title}</title>}
                {currentIcon.paths.map((path, i) => (
                    <path {...elem('path', props)} key={`path_${i}`} d={path} /> // eslint-disable-line react/no-array-index-key
                ))}
            </svg>
        </div>
    );
};

Icon.propTypes = {
    /** Makes the icon scale and align itself with text. Size prop will be ignored */
    alignWithText: PropTypes.bool,
    /** The icon context (e.g. brand, primary, bad, good etc. - defaults to brand) */
    context: PropTypes.oneOf(CONTEXTS),
    /** Which icon to show */
    name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
    /** Absolute size for this icon (size in pixels, aspect ratio is 1:1) */
    size: PropTypes.number,
    /** Optional icon title */
    title: PropTypes.string
};

Icon.defaultProps = {
    alignWithText: false,
    context: CONTEXTS[1],
    size: 16,
    title: null
};

export default Icon;
