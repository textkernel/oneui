import * as React from 'react';
import { Button } from '../../..';

interface Props {
    setPopupVisibility: (isVisible) => void;
}
export const PopoverDummy = React.forwardRef<HTMLDivElement, Props>(
    ({ setPopupVisibility }, ref) => {
        const popupStyle = {
            backgroundColor: '#FFEEDD',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #CCC',
            boxShadow: '0 3px 6px 6px rgba(0, 0, 0, 0.05)',
            fontSize: '14px',
        };
        return (
            <div style={popupStyle} ref={ref} role="group">
                <p>I am the content of pop up.</p>
                <p>Can be a form or anything.</p>
                <Button onClick={() => setPopupVisibility(false)}>Close me!</Button>
            </div>
        );
    }
);

PopoverDummy.displayName = 'Popover';
