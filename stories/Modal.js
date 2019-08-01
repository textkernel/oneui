import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { State, Store } from '@sambego/storybook-state';
import { Modal, Button } from '@textkernel/oneui';

storiesOf('Atoms|Modal', module)
    .addDecorator(withKnobs)
    .addDecorator(withInfo)
    .add(
        'Modal',
        () => {
            const store = new Store({ isOpen: false });
            const onClose = () => {
                console.log('Modal was requested to be closed.');
                store.set({ isOpen: false });
            };
            return (
                <div>
                    <State store={store}>
                        <Button onClick={() => store.set({ isOpen: true })}>Open Modal</Button>
                        <Modal
                            isOpen={store.get('isOpen')}
                            contentLabel={text(
                                'Label for content visible to screenreaders',
                                'My superb modal'
                            )}
                            onRequestClose={onClose}
                        >
                            Some content
                        </Modal>
                    </State>
                </div>
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
                To do this call the following function once:

                > __Modal.setAppElement__(appElementSelector);
                `,
            },
        }
    );
