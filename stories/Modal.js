import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { Modal } from '@textkernel/oneui';

storiesOf('Modal', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add(
        'Modal',
        () => {
            const onClose = () => console.log('Modal was requested to be closed.');
            return (
                <Modal
                    isOpen={boolean('Open', false)}
                    contentLabel={text(
                        'Label for content visible to screenreaders',
                        'My superb modal'
                    )}
                    onRequestClose={onClose}
                >
                    Some content
                </Modal>
            );
        },
        {
            info: {
                text: `
                ## Usage information

                This component is a wrapper around [react-modal](http://reactcommunity.org/react-modal/#usage).
                
                * You can pass other props according to their definition, apart from classes.
                * For accessibility reasons you need to __initialise__ modal use in your app. 
                For more info see [app element](http://reactcommunity.org/react-modal/accessibility/#app-element) in thier documentation. 
                To do this:

                > import OneUI from '@textkernel/oneui';

                > OneUI.__initModal__(appElementSelector);

                

                To see the modal in action here, change the Open prop to 'true' in the Knobs section.
                `
            }
        }
    );
