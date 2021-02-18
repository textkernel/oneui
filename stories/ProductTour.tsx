import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { ProductTour } from '@textkernel/oneui';

storiesOf('Organisms|ProductTour', module)
    .addDecorator(withKnobs)
    .add('ProgressBar', () => {
        const handleCancel = (isChecked = false) => {
            console.log(`onCancel was called with ${isChecked.toString()}`);
        };
        const handleFinished = (isChecked = false) => {
            console.log(`onFinished was called with ${isChecked.toString()}`);
        };

        const slides = [
            <div>
                <h1>Slide 1</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>,
            <div>
                <h1>Slide 2</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>,
            <div>
                <h1>Slide 3</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>,
            <div>
                <h1>Slide 4</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </div>,
        ];
        const numberOfSlides = select('Number of slides', [1, 2, 3, 4], 4);

        return (
            <ProductTour
                isOpen={boolean('Show tour', true)}
                checkboxLabel={text('Checkbox label', "Don't show again")}
                cancelLabel={text('Cancel button label', 'Skip tour')}
                continueLabel={text('Continue buttom label', 'Next')}
                finishLabel={text('Finishe buttom label', 'Finish')}
                onCancel={handleCancel}
                onFinished={handleFinished}
            >
                {slides.slice(0, numberOfSlides)}
            </ProductTour>
        );
    });
