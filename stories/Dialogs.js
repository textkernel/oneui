import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Alert, Button } from '@textkernel/oneui';

storiesOf('Molecules|Dialogs', module)
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
                    showAlert={showAlert}
                    onAccept={handleAccept}
                    acceptLabel={text('Accept button text', 'Ok')}
                    title={text('Title', 'Hi there!')}
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
                <Alert
                    showAlert={showAlert}
                    onAccept={handleAccept}
                    onCancel={handleCancel}
                    acceptLabel={text('Accept button text', 'Ok')}
                    cancelLabel={text('Cancel button text', 'Cancel')}
                    title={text('Title', 'Hi there!')}
                >
                    {text('Content', 'This is some information for you. Do you want to proceed?')}
                </Alert>
            </>
        );
    });
