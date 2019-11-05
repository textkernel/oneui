import React from 'react';
import PropTypes from 'prop-types';
import bem from '../../utils/bem';
import styles from './ContentPlaceholder.scss';

const { block, elem } = bem('ContentPlaceholder', styles);

const calcDuration = seconds => `${seconds}s`;

const calcMaskWidth = width => ({
    width: `${100 - Math.max(Math.min(width, 100), 0)}%`,
});

const ContentPlaceholder = props => {
    const { duration, height, width, withoutMargin, ...rest } = props;

    return (
        <div
            {...rest}
            {...block(props)}
            style={{
                animationDuration: calcDuration(duration),
                height,
            }}
        >
            &nbsp;
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
    width: PropTypes.number,
    /** Renders placeholder without its default margin */
    withoutMargin: PropTypes.bool,
};

ContentPlaceholder.defaultProps = {
    duration: 1,
    height: null,
    width: 100,
    withoutMargin: false,
};

export default ContentPlaceholder;
