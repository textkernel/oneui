import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, CONTEXTS, toast, Toaster, ToastProps } from '@textkernel/oneui';

const meta: Meta<typeof Toaster> = {
    title: 'Molecules/Toast',
    component: Toaster,
    argTypes: {
        context: {
            options: CONTEXTS,
            control: { type: 'radio' },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Toaster>;

const ToastImplementation = (args: ToastProps) => {
    const [duration, setDuration] = React.useState<number>();

    const openToast = () =>
        toast({
            title: args.title,
            description: args.description,
            context: args.context,
            actions: args.actions,
        });

    const handleOnClick = (timeDuration?: number) => {
        if (timeDuration) {
            setDuration(timeDuration);
        } else {
            setDuration(undefined);
        }
        openToast();
    };

    return (
        <div style={{ height: 400 }}>
            <Toaster duration={duration} />
            <Button onClick={() => handleOnClick(Infinity)}>Make Infinity Toast Appear</Button>
            <Button onClick={() => handleOnClick()}>Make Toast Appear</Button>
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
                href: '/login',
            },
        ],
    },
    render: (args) => <ToastImplementation {...(args as ToastProps)} />,
};
