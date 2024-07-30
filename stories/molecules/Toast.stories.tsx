import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, CONTEXTS, Toast, OneToaster, ToastProps } from '@textkernel/oneui';

const ToastImplementation = (args: ToastProps) => {
    const openToast = () =>
        Toast({
            title: args.title,
            description: args.description,
        });
    // const openActionToast = () =>
    //     Toast({
    //         title: args.title,
    //         description: args.description,
    //         actions: [
    //             {
    //                 text: 'Action',
    //                 callback: () => {
    //                     console.log('Action!');
    //                 },
    //             },
    //         ],
    //     });
    return (
        <>
            <OneToaster>
                <Button onClick={openToast}>Make Toast Appear</Button>
                {/* <Button onClick={openActionToast}>Make Actionable Toast Appear</Button> */}
            </OneToaster>
        </>
    );
};

const meta: Meta<typeof OneToaster> = {
    title: 'Molecules/Toast',
    component: OneToaster,
    render: (args) => <ToastImplementation {...(args as ToastProps)} />,
};

export default meta;

type Story = StoryObj<typeof ToastImplementation>;

export const RegularToast: Story = {
    name: 'Toast',
    args: {
        title: 'Success',
        description: 'This is a toast',
        context: CONTEXTS[1],
    },
    render: (args) => <ToastImplementation {...(args as ToastProps)} />,
};
