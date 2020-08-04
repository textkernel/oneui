import * as React from 'react';
import PropTypes from 'prop-types';
import Range from 'rc-slider/lib/Range';
import '../Slider.scss';

export const RangeSlider = React.forwardRef((props, ref) => <Range ref={ref} {...props} />);

RangeSlider.propTypes = {
    /** Set initial range of slider [lower, higher] */
    defaultValue: PropTypes.arrayOf(PropTypes.number),
    /** The minimum value of the slider */
    min: PropTypes.number,
    /** The maximum value of the slider */
    max: PropTypes.number,
    /**
     * Value to be added or subtracted on each step the slider makes.
     * Must be greater than zero, and max - min should be evenly divisible by the step value.
     */
    step: PropTypes.number,
};

RangeSlider.displayName = 'RangeSlider';

RangeSlider.defaultProps = {
    defaultValue: [0, 100],
    min: 0,
    max: 100,
    step: 1,
};
