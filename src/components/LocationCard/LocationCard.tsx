import * as React from 'react';
import { bem } from '../../utils';
import { Slider } from '../Sliders';
import { Text } from '../Text';
import { CROSS_CHAR, SIZES } from '../../constants';
import styles from './LocationCard.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
    /** Location id */
    locationId?: string;
    /** Location card title */
    locationTitle: string;
    /** Defines if location card has a radius slider */
    hasRadius?: boolean;
    /** Slider indication string for displaying its formatted value */
    sliderLabel?: string;
    /** The minimum value of the distance slider */
    minRadius?: number;
    /** The maximum value of the distance slider */
    maxRadius?: number;
    /**
     * Value to be added or subtracted on each step the distance slider makes.
     * Must be greater than zero, and max - min should be evenly divisible by the step value.
     */
    radiusStep?: number;
    /** The value to be displayed in the slider */
    distanceRadius: number;
    /** Slider value change callback */
    onRadiusChange?: (locationId: string | undefined, radius: number) => void;
    /** Location card delete callback */
    onDelete: (locationId: string | undefined) => void;
    /** HTML tag to be used as a wrapping component */
    As?: 'li' | 'div';
}

const { block, elem } = bem('LocationCard', styles);

const LocationCard: React.FC<Props> = ({
    As = 'div',
    locationId = undefined,
    locationTitle,
    hasRadius = false,
    distanceRadius,
    sliderLabel = '',
    minRadius = 1,
    maxRadius = 100,
    radiusStep = 1,
    onRadiusChange = () => undefined,
    onDelete,
    ...rest
}) => {
    const handleRadiusChange = (radius) => onRadiusChange(locationId, radius);

    const handleDelete = () => onDelete(locationId);

    return (
        <As {...rest} {...block({ ...rest })}>
            <div {...elem('header')}>
                <Text title={locationTitle} size={SIZES[2]} {...elem('title')}>
                    {locationTitle}
                </Text>
                <button onClick={handleDelete} type="button" {...elem('deleteButton')}>
                    {CROSS_CHAR}
                </button>
            </div>
            {hasRadius && (
                <div {...elem('slider')}>
                    <Slider
                        value={distanceRadius}
                        min={minRadius}
                        max={maxRadius}
                        step={radiusStep}
                        onChange={handleRadiusChange}
                    />
                    <Text size={SIZES[0]} {...elem('sliderLabel')}>
                        {sliderLabel}
                    </Text>
                </div>
            )}
        </As>
    );
};

LocationCard.displayName = 'LocationCard';

export { LocationCard, Props as LocationCardProps };
