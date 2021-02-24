import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { ProductTour } from '@textkernel/oneui';
import { slides } from '../src/components/ProductTour/__mocks__/slides';

storiesOf('Organisms|ProductTour', module)
    .addDecorator(withKnobs)
    .add('ProgressBar', () => {
        const handleCancel = (isChecked = false) => {
            console.log(`onCancel was called with ${isChecked.toString()}`);
        };
        const handleFinished = (isChecked = false) => {
            console.log(`onFinished was called with ${isChecked.toString()}`);
        };

        const numberOfSlides = select('Number of slides', [1, 2, 3, 4], 4);

        return (
            <ProductTour
                isOpen={boolean('Show tour', true)}
                checkboxLabel={text('Checkbox label', 'Do not show again')}
                cancelLabel={text('Cancel button label', 'Skip tour')}
                continueLabel={text('Continue button label', 'Next')}
                finishLabel={text('Finish button label', 'Finish')}
                onCancel={handleCancel}
                onFinished={handleFinished}
                contentLabel={text('Title for screen readers', 'Super cool tour')}
                ariaHideApp={false} // suppress consol warnings from Modal
            >
                {numberOfSlides === 1 ? slides[0] : slides.slice(0, numberOfSlides)}
            </ProductTour>
        );
    });
