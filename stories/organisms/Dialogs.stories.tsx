import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Button, Dialog, Confirm } from '@textkernel/oneui';

const meta: Meta<typeof Alert> = {
    title: 'Organisms/Dialogs',
    component: Alert,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { Dialog } as any,
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
                    onClose={handleAccept}
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
                    onClose={handleCancel}
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

type DialogStory = StoryObj<typeof Alert>;

export const _Dialog: DialogStory = {
    name: 'Dialog',
    args: {
        title: 'You’re about to delete this page',
        contentLabel: 'content label',
        children: (
            <div>
                Before you delete it permanently, there’s some things you should know:
                <ul>
                    <li>4 pages have links to this page that will break </li>
                    <li>2 child pages will be left behind in the page tree</li>
                </ul>
            </div>
        ),
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
                <Dialog
                    {...args}
                    isOpen={showAlert}
                    onClose={handleCancel}
                    acceptButton={{
                        onClick: handleAccept,
                        label: 'Delete',
                    }}
                    variant="critical"
                    cancelButton={{
                        onClick: handleCancel,
                        label: 'Cancel',
                    }}
                />
            </>
        );
    },
};
