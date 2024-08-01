import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Toast, OneToaster, ToastProps } from '@textkernel/oneui';

const meta: Meta<typeof OneToaster> = {
    title: 'Molecules/Toast',
    component: OneToaster,
    argTypes: {
        context: {
            options: ['info', 'cautious', 'success', 'critical'],
            control: { type: 'radio' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof OneToaster>;

const ToastImplementation = (args: ToastProps) => {
    const openToast = () =>
        Toast({
            title: args.title,
            description: args.description,
            context: args.context,
            actions: args.actions,
        });
    return (
        <div style={{ height: 400 }}>
            <OneToaster>
                <Button onClick={openToast}>Make Toast Appear</Button>
            </OneToaster>
        </div>
    );
};

export const RegularToast: Story = {
    name: 'Toast',
    args: {
        title: 'Toast title',
        description: 'Description',
        context: 'info',
        actions: [
            {
                text: 'Action 1',
                callback: () => {
                    console.log('action 1');
                },
            },
            {
                text: 'Action 2',
                callback: () => {
                    console.log('action 2');
                },
            },
        ],
    },
    render: (args) => <ToastImplementation {...(args as ToastProps)} />,
};
