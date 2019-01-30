import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './Icon.scss';
import { CONTEXTS, ICONS } from '../../constants';

const { block, elem } = bem({
    name: 'Icon',
    classnames: styles,
    propsToMods: ['context']
});

const Icon = props => {
    const { name, size, title, ...rest } = props;

    const currentIcon = ICONS[name];

    return (
        <svg
            {...rest}
            {...block(props)}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={currentIcon.viewBox}
            aria-labelledby="title"
        >
            <title>{title}</title>
            {currentIcon.paths.map((path, i) => (
                <path {...elem('path', props)} key={`path_${i}`} d={path} /> // eslint-disable-line react/no-array-index-key
            ))}
        </svg>
    );
};

Icon.propTypes = {
    context: PropTypes.oneOf(CONTEXTS),
    name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
    size: PropTypes.number,
    title: PropTypes.string
};

Icon.defaultProps = {
    context: CONTEXTS[1],
    size: 16,
    title: 'Icon'
};

export default Icon;
