import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { Popup, Button } from '@textkernel/oneui';

const Popover = React.forwardRef((props, ref) => {
    const { setPopupVisibility } = props;
    const popupStyle = {
        backgroundColor: '#FFEEDD',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #CCC',
        boxShadow: '0 3px 6px 6px rgba(0, 0, 0, 0.05)',
    };
    return (
        <div style={popupStyle} ref={ref}>
            <p>I am the content of pop up.</p>
            <p>Can be a form or anything.</p>
            <Button onClick={() => setPopupVisibility(false)}>Close me!</Button>
        </div>
    );
});
Popover.propTypes = {
    setPopupVisibility: PropTypes.func.isRequired,
};
Popover.displayName = 'Popover';

storiesOf('Atoms|Popup', module).add('Popup', () => (
    <Popup
        anchor={({ setPopupVisibility, isOpened }) => (
            <Button onClick={() => setPopupVisibility(!isOpened)}>Click me!</Button>
        )}
        content={({ setPopupVisibility }) => <Popover setPopupVisibility={setPopupVisibility} />}
    />
));
