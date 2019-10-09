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
    const { children, onClear, name, content } = props;
    const dropdownRef = React.createRef();

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
            />
        );
    };

    const dropdownRenderer = ({ setPopupVisibility, ref }) =>
        children({
            ref,
            close: () => setPopupVisibility(false),
            innerPadding: 'var(--spacing-3x)',
            ...block(props),
        });

    return (
        <PopupBase
            anchorRenderer={buttonRenderer}
            popupRenderer={dropdownRenderer}
            popupRef={dropdownRef}
        />
    );
};

Pill.displayName = 'Pill';

Pill.propTypes = {
    /** The dropdown content renderer function. It is called with:
     *   * close {function} that closes the dropdown
     *   * className {string} that should be applied to the container
     * It should return a single div */
    children: PropTypes.func.isRequired,
    /** a function to be called to clear the pill/filter content */
    onClear: PropTypes.func.isRequired,
    /** name describing the pill/filter */
    name: PropTypes.string.isRequired,
    /** label describing the content of an active filter/pill */
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Pill.defaultProps = {
    content: null,
};

export default Pill;
