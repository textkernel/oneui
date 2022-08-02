import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { ProductTour } from '@textkernel/oneui';
import { slides } from '../src/components/ProductTour/__mocks__/slides';

storiesOf('Organisms/ProductTour', module)
    .addDecorator(withKnobs)
    .add('ProductTour', () => {
        const handleCancel = (isChecked = false) => {
            console.log(`onCancel was called with ${isChecked.toString()}`);
        };
        const handleFinished = (isChecked = false) => {
            console.log(`onFinished was called with ${isChecked.toString()}`);
        };

        const numberOfSlides = number('Number of slides', 4, {
            range: true,
            min: 1,
            max: 4,
            step: 1,
        });
        const isMultiSlide = numberOfSlides > 1;

        return (
            <ProductTour
                isOpen={boolean('Show tour', true)}
                checkboxLabel={text('Checkbox label', 'Do not show again')}
                cancelLabel={isMultiSlide ? text('Cancel button label', 'Skip tour') : undefined}
                continueLabel={isMultiSlide ? text('Continue button label', 'Next') : undefined}
                finishLabel={text('Finish button label', 'Finish')}
                onCancel={isMultiSlide ? handleCancel : undefined}
                onFinished={handleFinished}
                contentLabel={text('Title for screen readers', 'Super cool tour')}
                ariaHideApp={false} // suppress consol warnings from Modal
            >
                {numberOfSlides === 1 ? slides[0] : slides.slice(0, numberOfSlides)}
            </ProductTour>
        );
    });
