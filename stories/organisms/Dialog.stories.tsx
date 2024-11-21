import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Button, Dialog, Confirm } from '@textkernel/oneui';

const meta: Meta<typeof Dialog> = {
    title: 'Organisms/Dialogs',
    component: Dialog,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subcomponents: { Alert, Confirm } as any,
};

export default meta;

type DialogStory = StoryObj<typeof Dialog>;

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
                    <li>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
                        consequuntur eius impedit nostrum fuga reiciendis voluptas iusto,
                        dignissimos consequatur hic? Dolor ad vel, vitae nulla ipsum rerum voluptate
                        harum blanditiis? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Quas dignissimos laudantium odio alias laborum dicta harum nostrum ducimus,
                        optio doloribus sed similique in quidem ullam eligendi quisquam adipisci
                        error sequi.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rerum,
                        beatae dignissimos eos corrupti, consequuntur vel nulla eius atque autem,
                        odit numquam officiis. Quas voluptatum hic quis reprehenderit cum eos?
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rerum,
                        beatae dignissimos eos corrupti, consequuntur vel nulla eius atque autem,
                        odit numquam officiis. Quas voluptatum hic quis reprehenderit cum eos?
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rerum,
                        beatae dignissimos eos corrupti, consequuntur vel nulla eius atque autem,
                        odit numquam officiis. Quas voluptatum hic quis reprehenderit cum eos?
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rerum,
                        beatae dignissimos eos corrupti, consequuntur vel nulla eius atque autem,
                        odit numquam officiis. Quas voluptatum hic quis reprehenderit cum eos?
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi
                        consequuntur eius impedit nostrum fuga reiciendis voluptas iusto,
                        dignissimos consequatur hic? Dolor ad vel, vitae nulla ipsum rerum voluptate
                        harum blanditiis? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Quas dignissimos laudantium odio alias laborum dicta harum nostrum ducimus,
                        optio doloribus sed similique in quidem ullam eligendi quisquam adipisci
                        error sequi.
                    </li>
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

        const handleClose = () => {
            setShowAlert(false);
            console.log('Dialog has been closed');
        };

        return (
            <>
                <Button onClick={handleButtonClick}>Click to open Dialog</Button>
                <Dialog
                    {...args}
                    isOpen={showAlert}
                    acceptButton={{
                        onClick: handleAccept,
                        label: 'Delete',
                    }}
                    cancelButton={{
                        onClick: handleCancel,
                        label: 'Cancel',
                    }}
                    closeButton={{
                        onClick: handleClose,
                        label: 'Close',
                    }}
                    variant="critical"
                />
            </>
        );
    },
};

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

        const handleClose = () => {
            setShowAlert(false);
            console.log('Dialog has been closed');
        };

        return (
            <>
                <Button onClick={handleButtonClick}>Click to open Alert</Button>
                <Alert
                    {...args}
                    isOpen={showAlert}
                    acceptButton={{
                        onClick: handleAccept,
                        label: 'Ok',
                    }}
                    closeButton={{
                        onClick: handleClose,
                        label: 'Close',
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

        const handleClose = () => {
            setShowAlert(false);
            console.log('Dialog has been closed');
        };

        return (
            <>
                <Button onClick={handleButtonClick}>Click to open a Confirm</Button>
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
                    closeButton={{
                        onClick: handleClose,
                        label: 'Close',
                    }}
                />
            </>
        );
    },
};
