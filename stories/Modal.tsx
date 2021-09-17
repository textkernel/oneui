import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Modal, Button } from '@textkernel/oneui';
import { StoreInjector } from '../src/packages/storybook/withStore';

storiesOf('Atoms/Modal', module)
    .addDecorator(withKnobs)
    .addParameters(
        StoreInjector.withStore({
            isOpen: false,
        })
    )
    .add(
        'Modal that scrolls',
        (storyContext) => {
            const store = storyContext?.parameters.getStore();
            const onClose = () => {
                store.set({ isOpen: false });
                console.log('Modal was requested to be closed.');
            };
            return (
                <div>
                    <Button onClick={() => store.set({ isOpen: true })}>Open Modal</Button>
                    <Modal
                        isOpen={store.get('isOpen')}
                        contentLabel={text(
                            'Label for content visible to screenreaders',
                            'My superb modal'
                        )}
                        onRequestClose={onClose}
                    >
                        <h1>A heading</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                            sollicitudin, orci cursus sodales blandit, mi elit semper est, ac
                            pretium ipsum dui in erat. In hac habitasse platea dictumst. Ut
                            scelerisque odio a sapien maximus posuere. Integer fringilla, metus id
                            semper dapibus, elit libero laoreet nibh, molestie aliquet massa velit
                            nec est. Morbi euismod libero eget enim rutrum ullamcorper. Curabitur
                            consequat a urna a varius. Duis et nulla ultrices lorem pulvinar varius.
                            Nullam sed hendrerit magna. Aliquam molestie mauris justo, nec luctus
                            lectus viverra eu. Integer mi lorem, imperdiet dictum nisi quis, dictum
                            egestas est. Ut ut semper lectus, eget aliquam nibh. Donec vestibulum
                            consequat felis in aliquet.
                        </p>
                        <p>
                            Sed metus eros, sodales sed ante sed, pharetra finibus ipsum. Ut quis
                            dolor quis metus ultrices lacinia. Donec sed metus consequat, aliquet
                            libero in, pellentesque quam. Nullam nec aliquam massa. Morbi eu purus
                            at nulla sagittis imperdiet. Pellentesque aliquet tincidunt tellus, vel
                            dapibus erat feugiat quis. Praesent non ipsum lectus.
                        </p>
                        <p>
                            Aliquam tincidunt sem non risus vulputate, laoreet fringilla erat
                            congue. Pellentesque at magna ultricies, pharetra lacus et, venenatis
                            nunc. Sed et posuere erat, eget faucibus sem. Duis vulputate mauris
                            vitae felis porttitor lobortis. Vivamus eget egestas enim. Sed id sem
                            faucibus, feugiat dolor vitae, pharetra turpis. Suspendisse consequat
                            laoreet magna, vitae scelerisque odio. Pellentesque habitant morbi
                            tristique senectus et netus et malesuada fames ac turpis egestas.
                        </p>
                    </Modal>
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
    )
    .add(
        'Modal with fixed position',
        (storyContext) => {
            const store = storyContext?.parameters.getStore();
            const onClose = () => {
                store.set({ isOpen: false });
                console.log('Modal was requested to be closed.');
            };
            return (
                <div>
                    <Button onClick={() => store.set({ isOpen: true })}>Open Modal</Button>
                    <Modal
                        isOpen={store.get('isOpen')}
                        contentLabel={text(
                            'Label for content visible to screenreaders',
                            'My superb modal'
                        )}
                        onRequestClose={onClose}
                        isPositionFixed
                    >
                        <h1>A heading</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                            sollicitudin, orci cursus sodales blandit, mi elit semper est, ac
                            pretium ipsum dui in erat. In hac habitasse platea dictumst. Ut
                            scelerisque odio a sapien maximus posuere. Integer fringilla, metus id
                            semper dapibus, elit libero laoreet nibh, molestie aliquet massa velit
                            nec est. Morbi euismod libero eget enim rutrum ullamcorper. Curabitur
                            consequat a urna a varius. Duis et nulla ultrices lorem pulvinar varius.
                            Nullam sed hendrerit magna. Aliquam molestie mauris justo, nec luctus
                            lectus viverra eu. Integer mi lorem, imperdiet dictum nisi quis, dictum
                            egestas est. Ut ut semper lectus, eget aliquam nibh. Donec vestibulum
                            consequat felis in aliquet.
                        </p>
                        <p>
                            Sed metus eros, sodales sed ante sed, pharetra finibus ipsum. Ut quis
                            dolor quis metus ultrices lacinia. Donec sed metus consequat, aliquet
                            libero in, pellentesque quam. Nullam nec aliquam massa. Morbi eu purus
                            at nulla sagittis imperdiet. Pellentesque aliquet tincidunt tellus, vel
                            dapibus erat feugiat quis. Praesent non ipsum lectus.
                        </p>
                        <p>
                            Aliquam tincidunt sem non risus vulputate, laoreet fringilla erat
                            congue. Pellentesque at magna ultricies, pharetra lacus et, venenatis
                            nunc. Sed et posuere erat, eget faucibus sem. Duis vulputate mauris
                            vitae felis porttitor lobortis. Vivamus eget egestas enim. Sed id sem
                            faucibus, feugiat dolor vitae, pharetra turpis. Suspendisse consequat
                            laoreet magna, vitae scelerisque odio. Pellentesque habitant morbi
                            tristique senectus et netus et malesuada fames ac turpis egestas.
                        </p>
                    </Modal>
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
