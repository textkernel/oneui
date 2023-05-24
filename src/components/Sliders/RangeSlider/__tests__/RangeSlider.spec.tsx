import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RangeSlider } from '../RangeSlider';

describe('RangeSlider component', () => {
    const defaultAriaMax = '100';
    const defaultAriaMin = '0';
    const defaultAriaDisabled = 'false';
    const defaultAriaNow = '0';

    it('should render component correctly', () => {
        const view = render(<RangeSlider />);

        const sliders = screen.getAllByRole('slider');

        expect(view.container).toMatchSnapshot();
        expect(sliders).toHaveLength(2);
        expect(sliders[0]).toHaveAttribute('aria-valuemax', defaultAriaMax);
        expect(sliders[0]).toHaveAttribute('aria-valuemin', defaultAriaMin);
        expect(sliders[0]).toHaveAttribute('aria-disabled', defaultAriaDisabled);
        expect(sliders[0]).toHaveAttribute('aria-valuenow', defaultAriaNow);
    });
});
