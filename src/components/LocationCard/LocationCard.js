import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Slider, Text } from '../../index';
import { CROSS_CHAR, SIZES } from '../../constants';
import styles from './LocationCard.scss';

const MAX_LOCATION_TITLE_LENGTH = 25;

const { block, elem } = bem({
    name: 'LocationCard',
    classnames: styles,
});

const LocationCard = props => {
    const {
        locationId,
        locationTitle,
        distanceRadius,
        sliderLabel,
        minRadius,
        maxRadius,
        radiusStep,
        onRadiusChange,
        onDelete,
        ...rest
    } = props;

    const getTruncatedTitle = () => {
        if (locationTitle.length > MAX_LOCATION_TITLE_LENGTH) {
            return `${locationTitle.substring(0, MAX_LOCATION_TITLE_LENGTH)}...`;
        }

        return locationTitle;
    };

    const handleDelete = () => onDelete(locationId);

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('header', props)}>
                <Text title={locationTitle} size={SIZES[2]} {...elem('title', props)}>
                    {getTruncatedTitle()}
                </Text>
                <button onClick={handleDelete} type="button" {...elem('delete-button', props)}>
                    {CROSS_CHAR}
                </button>
            </div>
            <div {...elem('slider', props)}>
                <Slider
                    value={distanceRadius}
                    min={minRadius}
                    max={maxRadius}
                    step={radiusStep}
                    onChange={onRadiusChange}
                />
                <Text size={SIZES[0]} {...elem('slider-label', props)}>
                    {sliderLabel}
                </Text>
            </div>
        </div>
    );
};

LocationCard.displayName = 'LocationCard';

LocationCard.propTypes = {
    /** Location id */
    locationId: PropTypes.string,
    /** Location card title. Gets truncated from the end if the string length is more than 25 symbols. */
    locationTitle: PropTypes.string.isRequired,
    /** Slider indication string for displaying its formatted value */
    sliderLabel: PropTypes.string,
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
    locationId: null,
    sliderLabel: '',
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
    onRadiusChange: () => null,
    onDelete: () => null,
};

export default LocationCard;
