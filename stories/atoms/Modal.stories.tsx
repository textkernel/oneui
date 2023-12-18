import * as React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal, Button } from '@textkernel/oneui';

const ModalImplementation = (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => {
        setIsOpen(false);
        console.log('Modal was requested to be closed.');
    };
    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Modal {...args} isOpen={isOpen} onRequestClose={onClose} />
        </div>
    );
};

const meta: Meta<typeof Modal> = {
    title: 'Atoms/Modal',
    component: Modal,
    render: (args) => <ModalImplementation {...args} />,
};

export default meta;

type Story = StoryObj<typeof Modal>;

const longText = (
    <>
        <h1>A heading</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin, orci cursus
            sodales blandit, mi elit semper est, ac pretium ipsum dui in erat. In hac habitasse
            platea dictumst. Ut scelerisque odio a sapien maximus posuere. Integer fringilla, metus
            id semper dapibus, elit libero laoreet nibh, molestie aliquet massa velit nec est. Morbi
            euismod libero eget enim rutrum ullamcorper. Curabitur consequat a urna a varius. Duis
            et nulla ultrices lorem pulvinar varius. Nullam sed hendrerit magna. Aliquam molestie
            mauris justo, nec luctus lectus viverra eu. Integer mi lorem, imperdiet dictum nisi
            quis, dictum egestas est. Ut ut semper lectus, eget aliquam nibh. Donec vestibulum
            consequat felis in aliquet.
        </p>
        <p>
            Sed metus eros, sodales sed ante sed, pharetra finibus ipsum. Ut quis dolor quis metus
            ultrices lacinia. Donec sed metus consequat, aliquet libero in, pellentesque quam.
            Nullam nec aliquam massa. Morbi eu purus at nulla sagittis imperdiet. Pellentesque
            aliquet tincidunt tellus, vel dapibus erat feugiat quis. Praesent non ipsum lectus.
        </p>
        <p>
            Aliquam tincidunt sem non risus vulputate, laoreet fringilla erat congue. Pellentesque
            at magna ultricies, pharetra lacus et, venenatis nunc. Sed et posuere erat, eget
            faucibus sem. Duis vulputate mauris vitae felis porttitor lobortis. Vivamus eget egestas
            enim. Sed id sem faucibus, feugiat dolor vitae, pharetra turpis. Suspendisse consequat
            laoreet magna, vitae scelerisque odio. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas.
        </p>
    </>
);

export const ScrollingModal: Story = {
    name: 'Modal that scrolls',
    args: {
        contentLabel: 'My superb modal',
        children: longText,
    },
};

export const FixedModal: Story = {
    name: 'Modal with fixed position',
    args: {
        contentLabel: 'My superb modal',
        children: longText,
        isPositionFixed: true,
    },
};
