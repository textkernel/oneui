import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Heading, Slider, Text } from '../../index';
import { CROSS_CHAR } from '../../constants';
import styles from './LocationCard.scss';

const { block } = bem({
    name: 'LocationCard',
    classnames: styles,
});

const LocationCard = props => {
    const {
        locationTitle,
        distanceRadius,
        sliderIndicationString,
        minRadius,
        maxRadius,
        radiusStep,
        onRadiusChange,
        onDelete,
        ...rest
    } = props;

    return (
        <div {...rest} {...block(props)}>
            <div className="header">
                <Heading className="title">{locationTitle}</Heading>
                <Heading className="delete-button" onClick={onDelete}>
                    {CROSS_CHAR}
                </Heading>
            </div>
            <div className="slider">
                <Slider
                    value={distanceRadius}
                    min={minRadius}
                    max={maxRadius}
                    step={radiusStep}
                    onChange={onRadiusChange}
                />
                <Text className="slider-indication">{sliderIndicationString}</Text>
            </div>
        </div>
    );
};

LocationCard.displayName = 'LocationCard';

LocationCard.propTypes = {
    /** Location title */
    locationTitle: PropTypes.string,
    /** Slider indication string for displaying its formatted value */
    sliderIndicationString: PropTypes.string,
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
    onDelete: PropTypes.func,
};

LocationCard.defaultProps = {
    locationTitle: 'Placeholder',
    sliderIndicationString: '',
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
    onRadiusChange: () => null,
    onDelete: () => null,
};

export default LocationCard;
