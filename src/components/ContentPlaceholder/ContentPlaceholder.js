import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import styles from './ContentPlaceholder.scss';

const { block, elem } = bem({
    name: 'ContentPlaceholder',
    classnames: styles,
    propsToMods: []
});

const calcDuration = seconds => {
    if (!seconds) {
        return null;
    }

    return `${seconds}s`;
};

const calcMaskWidth = width => {
    if (!width) {
        return null;
    }

    return {
        width: `${100 - Math.max(Math.min(width, 100), 0)}%`
    };
};

const ContentPlaceholder = props => {
    const { duration, height, width, ...rest } = props;

    return (
        <div
            {...rest}
            {...block(props)}
            style={{
                animationDuration: calcDuration(duration),
                height
            }}
        >
            <div {...elem('mask', props)} style={calcMaskWidth(width)} />
        </div>
    );
};

ContentPlaceholder.displayName = 'ContentPlaceholder';

ContentPlaceholder.propTypes = {
    /** Animation duration in seconds */
    duration: PropTypes.number,
    /** Custom height in pixels for the content placeholder */
    height: PropTypes.number,
    /** Width of the content placeholder, relative to its parent */
    width: PropTypes.number
};

ContentPlaceholder.defaultProps = {
    duration: 1,
    height: null,
    width: 100
};

export default ContentPlaceholder;
