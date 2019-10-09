import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import PopupBase from '../PopupBase';
import PillButton from './PillButton';
import styles from './PillDropdown.scss';

const { block } = bem({
    name: 'PillDropdown',
    classnames: styles,
});

const Pill = props => {
    const {
        onClear,
        name,
        ref,
        content,
        children,
        dropdownRef: dropdownRefFromProps,
        ...rest
    } = props;

    const buttonRef = ref || React.createRef();
    const dropdownRef = dropdownRefFromProps || React.createRef();

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

    const dropdownRenderer = ({ setPopupVisibility, ref: refFromPopup }) =>
        children({
            ref: refFromPopup,
            close: () => setPopupVisibility(false),
            innerPadding: 'var(--spacing-3x)',
            ...block({}),
        });

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
     *   * className {string} that should be applied to the container
     *   * innerPadding {string} that can be applied inside the component to set consistent padding
     * NOTE: The returned element should support refForward, but should not have it set.
     *   If you need to access the ref, pass the ref with dropdownRef prop (see below)
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
    /** ref for dropdown */
    dropdownRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Pill.defaultProps = {
    content: null,
    ref: null,
    dropdownRef: null,
};

export default Pill;
