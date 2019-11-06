import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../../utils/bem';
import Text from '../Text';
import styles from './MarkedText.scss';

const { block, elem } = bem('MarkedText', styles);

const MarkedText = props => {
    const { marker, children, ...rest } = props;

    let result = children;
    if (marker) {
        const re = new RegExp(`(${marker})`, 'gi');
        result = children.split(re).map((part, i) =>
            part.toLowerCase() === marker.toLowerCase() ? (
                // eslint-disable-next-line react/no-array-index-key
                <mark key={`match${i}`} {...elem('marked', props)}>
                    {part}
                </mark>
            ) : (
                part
            )
        );
    }

    return (
        <Text {...rest} {...block(props)}>
            {result}
        </Text>
    );
};

MarkedText.displayName = 'MarkedText';

MarkedText.propTypes = {
    /** Text content */
    children: PropTypes.string.isRequired,
    /** The text that should be marked if found within the children */
    marker: PropTypes.string.isRequired,
};

export default MarkedText;
