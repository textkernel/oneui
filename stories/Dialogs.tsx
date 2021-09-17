import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Alert, Confirm, Button } from '@textkernel/oneui';

storiesOf('Organisms|Dialogs', module)
    .addDecorator(withKnobs)
    .add('Alert', () => {
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
                        label: text('Accept button text', 'Ok'),
                    }}
                    title={text('Title', 'Hi there!')}
                    contentLabel="An alert dialog"
                >
                    {text('Content', 'This is some information for you.')}
                </Alert>
            </>
        );
    })
    .add('Confirm', () => {
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
                        label: text('Accept button text', 'Ok'),
                    }}
                    cancelButton={{
                        onClick: handleCancel,
                        label: text('Cancel button text', 'Cancel'),
                    }}
                    title={text('Title', 'Hi there!')}
                    contentLabel="A confirm dialog"
                >
                    {text('Content', 'This is some information for you. Do you want to proceed?')}
                </Confirm>
            </>
        );
    });
