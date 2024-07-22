import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, CONTEXTS, Toast } from '@textkernel/oneui';

const ToastImplementation = (args) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const onClose = () => {
        setIsVisible(false);
        console.log('Modal was requested to be closed.');
    };
    return (
        <div>
            <Button onClick={() => setIsVisible(true)}>Make Toast Appear</Button>
            <Toast {...args} isVisible={isVisible} onClose={onClose} />
        </div>
    );
};

const meta: Meta<typeof Toast> = {
    title: 'Molecules/Toast',
    component: Toast,
    render: (args) => <ToastImplementation {...args} />,
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const NotActionableToast: Story = {
    name: 'Normal Toast',
    args: {
        title: 'Success',
        content: 'This is a toast',
        context: CONTEXTS[1],
        closeButtonLabel: 'closeButton',
    },
    render: (args) => <Toast {...args} />,
};

export const ActionableToast: Story = {
    name: 'Actionable Toast',
    args: {
        title: 'Success',
        content: 'This is an Actionable toast',
        context: CONTEXTS[1],
        actions: [
            {
                text: 'Action 1',
                href: '/action-one',
            },
        ],
        closeButtonLabel: 'closeButton',
    },
    render: (args) => <Toast {...args} />,
};
