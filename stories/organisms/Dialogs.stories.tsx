import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Confirm, Button } from '@textkernel/oneui';
import { Dialog } from '@textkernel/oneui/components/Dialogs/Dialog';

const meta: Meta<typeof Alert> = {
    title: 'Organisms/Dialogs',
    component: Alert,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { Confirm } as any,
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const _Alert: Story = {
    name: 'Alert',
    args: {
        contentLabel: 'An alert dialog',
        title: 'Hi there!',
        children: 'This is some information for you.',
    },
    render: (args) => {
        const [showAlert, setShowAlert] = React.useState(false);

        const handleButtonClick = () => {
            setShowAlert(true);
        };

        const handleAccept = () => {
            setShowAlert(false);
            console.log('Dialog has been accepted');
        };

        return (
            <>
                <Button onClick={handleButtonClick}>Click me to see an alert</Button>
                <Alert
                    {...args}
                    isOpen={showAlert}
                    acceptButton={{
                        onClick: handleAccept,
                        label: 'Ok',
                    }}
                />
            </>
        );
    },
};

type ConfirmStory = StoryObj<typeof Confirm>;

export const _Confirm: ConfirmStory = {
    name: 'Confirm',
    args: {
        title: 'Hi there!',
        contentLabel: 'A confirm dialog',
        children: 'This is some information for you. Do you want to proceed?',
    },
    render: (args) => {
        const [showAlert, setShowAlert] = React.useState(false);

        const handleButtonClick = () => {
            setShowAlert(true);
        };

        const handleAccept = () => {
            setShowAlert(false);
            console.log('Dialog has been accepted');
        };

        const handleCancel = () => {
            setShowAlert(false);
            console.log('Dialog has been cancelled');
        };

        return (
            <>
                <Button onClick={handleButtonClick}>Click me to see a confirm dialog</Button>
                <Confirm
                    {...args}
                    isOpen={showAlert}
                    acceptButton={{
                        onClick: handleAccept,
                        label: 'Ok',
                    }}
                    cancelButton={{
                        onClick: handleCancel,
                        label: 'Cancel',
                    }}
                />
            </>
        );
    },
};

export const _Dialog: ConfirmStory = {
    name: 'Dialog',
    args: {
        title: 'Duplicate this page',
        contentLabel: 'content label',
        children: 'this is not as cool as I wanted ',
    },
    render: (args) => {
        const [showAlert, setShowAlert] = React.useState(false);

        const handleButtonClick = () => {
            setShowAlert(true);
            console.log('hel')
        };

        const handleAccept = () => {
            setShowAlert(false);
            console.log('Dialog has been accepted');
        };

        const handleCancel = () => {
            setShowAlert(false);
            console.log('Dialog has been cancelled');
        };

        return (
            <Dialog
                onTriggerDialog={handleButtonClick}
                dialogTrigger={<p>Trigger me please!</p>}
                {...args}
                isOpen={showAlert}
                acceptButton={{
                    onClick: handleAccept,
                    label: 'Ok',
                }}
                cancelButton={{
                    onClick: handleCancel,
                    label: 'Cancel',
                }}
            />
        );
    },
};
