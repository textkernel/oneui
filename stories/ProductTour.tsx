import * as React from 'react';
import { ProductTour } from '@textkernel/oneui';
import { slides } from '../src/components/ProductTour/__mocks__/slides';

export default {
    title: 'Organisms/ProductTour',
    component: ProductTour,
    argTypes: {
        numberOfSlides: { control: { type: 'range', min: 1, max: 4, step: 1 } },
    },
};

export const _ProductTour = ({ numberOfSlides, ...args }) => (
    // @ts-ignore
    <ProductTour {...args}>
        {numberOfSlides === 1 ? slides[0] : slides.slice(0, numberOfSlides)}
    </ProductTour>
);
_ProductTour.args = {
    isOpen: true,
    checkboxLabel: 'Do not show again',
    cancelLabel: 'Skip tour',
    continueLabel: 'Next',
    finishLabel: 'Finish',
    contentLabel: 'Super cool tour',
    ariaHideApp: false, // suppress consol warnings from Modal
};
