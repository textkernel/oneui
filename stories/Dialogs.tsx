import * as React from 'react';
import { Alert, Confirm, Button } from '@textkernel/oneui';

export default {
    title: 'Organisms/Dialogs',
    component: Alert,
    subcomponents: { Confirm },
};

export const _Alert = (args) => {
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
                isOpen={showAlert}
                acceptButton={{
                    onClick: handleAccept,
                    label: 'Ok',
                }}
                {...args}
            />
        </>
    );
};
_Alert.args = {
    contentLabel: 'An alert dialog',
    title: 'Hi there!',
    children: 'This is some information for you.',
};

export const _Confirm = (args) => {
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
                isOpen={showAlert}
                acceptButton={{
                    onClick: handleAccept,
                    label: 'Ok',
                }}
                cancelButton={{
                    onClick: handleCancel,
                    label: 'Cancel',
                }}
                {...args}
            />
        </>
    );
};
_Confirm.args = {
    title: 'Hi there!',
    contentLabel: 'A confirm dialog',
    children: 'This is some information for you. Do you want to proceed?',
};
