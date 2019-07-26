import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { Heading, Slider, Text } from '../../index';
import { CROSS_CHAR } from '../../constants';
import styles from './LocationCard.scss';

const { block, elem } = bem({
    name: 'LocationCard',
    classnames: styles,
});

const LocationCard = props => {
    const {
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

    return (
        <div {...rest} {...block(props)}>
            <div {...elem('header', props)}>
                <Heading {...elem('title', props)}>{locationTitle}</Heading>
                <button onClick={onDelete} type="button" {...elem('delete-button', props)}>
                    <Heading>{CROSS_CHAR}</Heading>
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
                <Text {...elem('slider-label', props)}>{sliderLabel}</Text>
            </div>
        </div>
    );
};

LocationCard.displayName = 'LocationCard';

LocationCard.propTypes = {
    /** Location title */
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
    sliderLabel: '',
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
    onRadiusChange: () => null,
    onDelete: () => null,
};

export default LocationCard;
