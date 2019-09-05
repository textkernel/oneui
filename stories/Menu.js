import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs';
import { Popup, Button } from '@textkernel/oneui';

// -------------------------------

const ButtonAnchor = React.forwardRef((props, ref) => {
    const { setPopupVisibility, isOpened } = props;
    return (
        <Button ref={ref} onClick={() => setPopupVisibility(!isOpened)}>
            Click Me!
        </Button>
    );
});
ButtonAnchor.propTypes = {
    setPopupVisibility: PropTypes.func.isRequired,
};
ButtonAnchor.displayName = 'ButtonAnchor';

// -------------------------------

function SubItems({ subItems }) {
    const popupStyle = {
        backgroundColor: '#FFEEDD',
        padding: 0,
        borderRadius: '5px',
        border: '1px solid #CCC',
        boxShadow: '0 3px 6px 6px rgba(0, 0, 0, 0.05)',
    };
    return React.forwardRef((props, ref) => (
        <div style={popupStyle} ref={ref}>
            {subItems}
        </div>
    ));
}
SubItems.displayName = 'SubItems';

const MenuItem = React.forwardRef((props, ref) => {
    const { children, subItems = [], ...restProps } = props;
    const popupStyle = {
        padding: '5px',
        borderBottom: '1px solid #EEE',
    };
    return (
        <div style={popupStyle} ref={ref} {...restProps}>
            {subItems.length === 0 ? (
                children
            ) : (
                <Popup anchor={() => children} content={() => <SubItems subItems={subItems} />} />
            )}
        </div>
    );
});
MenuItem.propTypes = {
    children: PropTypes.element,
    subItems: PropTypes.arrayOf(PropTypes.element),
};
MenuItem.displayName = 'MenuItem';

// -------------------------------

const Menu = React.forwardRef((props, ref) => {
    const popupStyle = {
        backgroundColor: '#FFEEDD',
        padding: 0,
        borderRadius: '5px',
        border: '1px solid #CCC',
        boxShadow: '0 3px 6px 6px rgba(0, 0, 0, 0.05)',
    };
    return (
        <div style={popupStyle} ref={ref}>
            <MenuItem>Foo</MenuItem>
            <MenuItem>Bar</MenuItem>
            <Popup
                placement="right-start"
                anchor={({ setPopupVisibility }) => (
                    <MenuItem
                        ref={ref}
                        onMouseEnter={() => setPopupVisibility(true)}
                        onMouseLeave={() => setPopupVisibility(false)}
                    >
                        Bar
                    </MenuItem>
                )}
                content={({ setPopupVisibility, isOpened }) => (
                    <Menu setPopupVisibility={setPopupVisibility} isOpened={isOpened} />
                )}
            />
            <MenuItem>Buz</MenuItem>
        </div>
    );
});
Menu.displayName = 'Menu';

// -------------------------------

storiesOf('Molecules|Menu (Popup based)', module)
    // .addDecorator(withKnobs)
    .add('Menu', () => (
        <Popup
            anchor={({ setPopupVisibility, isOpened }) => (
                <ButtonAnchor setPopupVisibility={setPopupVisibility} isOpened={isOpened} />
            )}
            content={() => <Menu />}
        />
    ));
