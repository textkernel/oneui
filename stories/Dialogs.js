import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Alert, Button } from '@textkernel/oneui';

const ExampleAlert = (props) => {
    const { children, type, ...rest } = props;
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

    const buttonText =
        type === 'alert' ? 'Click me to see an alert' : 'Click me to see a confirm dialog';
    const alertProps = { ...rest, showAlert, onAccept: handleAccept };
    if (type === 'confirm') {
        alertProps.onCancel = handleCancel;
    }

    return (
        <>
            <Button onClick={handleButtonClick}>{buttonText}</Button>
            <Alert {...alertProps}>{children}</Alert>
        </>
    );
};

storiesOf('Molecules|Dialogs', module)
    .addDecorator(withKnobs)
    .add('Alert', () => {
        return (
            <ExampleAlert
                acceptLabel={text('Accept button text', 'Dismiss')}
                title={text('Title', 'Hi there!')}
                type="alert"
            >
                {text('Content', 'This is some information for you')}
            </ExampleAlert>
        );
    })
    .add('Confirm', () => {
        return (
            <ExampleAlert
                acceptLabel={text('Accept button text', 'Ok')}
                cancelLabel={text('Accept button text', 'Cancel')}
                title={text('Title', 'Hi there!')}
                type="confirm"
            >
                {text('Content', 'This is some information for you. Do you want to proceed?')}
            </ExampleAlert>
        );
    });
