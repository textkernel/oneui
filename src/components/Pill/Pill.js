import React from 'react';
import PropTypes from 'prop-types';
import PopupBase from '../PopupBase';
import PillButton from './PillButton';
import PillDropdown from './PillDropdown';

const Pill = props => {
    const {
        onClear,
        name,
        ref,
        content,
        children,
        dropdownRef: dropdownRefFromProps,
        noPaddingInDropdown,
        additionalDropdownProps,
        ...rest
    } = props;

    const buttonRef = React.useMemo(() => ref || React.createRef(), [ref]);
    const dropdownRef = React.useMemo(() => dropdownRefFromProps || React.createRef(), [
        dropdownRefFromProps,
    ]);

    // eslint-disable-next-line react/display-name, react/prop-types
    const buttonRenderer = ({ setPopupVisibility, isOpen }) => {
        const toggleDropdown = () => {
            setPopupVisibility(!isOpen);
        };

        return (
            <PillButton
                name={name}
                content={content}
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                onClear={onClear}
                {...rest}
            />
        );
    };

    // eslint-disable-next-line react/display-name, react/prop-types
    const dropdownRenderer = ({ setPopupVisibility }) => (
        <PillDropdown
            close={() => setPopupVisibility(false)}
            noPadding={noPaddingInDropdown}
            {...additionalDropdownProps}
        >
            {children}
        </PillDropdown>
    );

    return (
        <PopupBase
            anchorRenderer={buttonRenderer}
            popupRenderer={dropdownRenderer}
            anchorRef={buttonRef}
            popupRef={dropdownRef}
        />
    );
};

Pill.displayName = 'Pill';

Pill.propTypes = {
    /** The dropdown content renderer function. It is called with:
     *   * close {function} that closes the dropdown
     *   * innerPadding {string} that can be applied inside the component to set consistent padding
     */
    children: PropTypes.func.isRequired,
    /** a function to be called to clear the pill/filter content */
    onClear: PropTypes.func.isRequired,
    /** name describing the pill/filter */
    name: PropTypes.string.isRequired,
    /** label describing the content of an active filter/pill */
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** ref for pill button */
    ref: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** ref for pill dropdown */
    dropdownRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** whether or not to add a padding to the dropdown container.
     * It is useful if you need to add elements that stretch to the edge of the container.
     * You can use the CSS variable --pill-dropdown-padding to add padding as required.
     * */
    noPaddingInDropdown: PropTypes.bool,
    /** other props that need to be applied to the dropdown container */
    additionalDropdownProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Pill.defaultProps = {
    content: null,
    ref: null,
    dropdownRef: null,
    noPaddingInDropdown: false,
    additionalDropdownProps: {},
};

export default Pill;
