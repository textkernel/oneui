import * as React from 'react';
import PropTypes from 'prop-types';
import RCSlider from 'rc-slider/lib/Slider';
import './Slider.scss';

const Slider = React.forwardRef((props, ref) => <RCSlider {...props} ref={ref} />);

Slider.displayName = 'Slider';

Slider.propTypes = {
    /** Set initial value of slider */
    initialValue: PropTypes.number,
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

Slider.defaultProps = {
    initialValue: 0,
    min: 0,
    max: 100,
    step: 1,
};

export default Slider;
