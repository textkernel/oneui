import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Heading, Text } from '@textkernel/oneui';
import { CROSS_CHAR } from '../../constants';
import styles from './LocationCard.scss';

const { block } = bem({
    name: 'LocationCard',
    classnames: styles
});

const LocationCard = props => {
    const { duration, height, width, withoutMargin, ...rest } = props;

    return (
        <div {...rest} {...block(props)}>
            <div className="header">
                <Heading className="title">London</Heading>
                <Heading className="closeButton" onClick={() => console.log('close')}>
                    {CROSS_CHAR}
                </Heading>
            </div>
            <div className="slider">
                <Text>+5 miles</Text>
            </div>
        </div>
    );
};

LocationCard.displayName = 'LocationCard';

LocationCard.propTypes = {
    /** Object that describes the location and its radius */
    location: PropTypes.objectOf({
        title: PropTypes.string
    }).isRequired,
    locationToString: PropTypes.func.isRequired,
    /** Units type to be shown next to the distance slider value */
    distanceUnits: PropTypes.string,
    /** The minimum value of the distance slider */
    minRadius: PropTypes.number,
    /** The maximum value of the distance slider */
    maxRadius: PropTypes.number,
    /**
     * Value to be added or subtracted on each step the distance slider makes.
     * Must be greater than zero, and max - min should be evenly divisible by the step value.
     */
    radiusStep: PropTypes.number,
    /** Slider value change callback */
    onRadiusChange: PropTypes.func,
    /** Location card delete callback */
    onDelete: PropTypes.func
};

LocationCard.defaultProps = {
    distanceUnits: 'km',
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
    onRadiusChange: () => true,
    onDelete: () => true
};

export default LocationCard;
