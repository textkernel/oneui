import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { CROSS_CHAR, ENTER_KEY } from '../../../constants';
import styles from './PillButton.scss';

const { block, elem } = bem({
    name: 'PillButton',
    classnames: styles,
    propsToMods: ['isActive', 'isOpen'],
});

const PillButton = React.forwardRef((props, ref) => {
    const { isOpen, togglePopup, onClear, name, label, ...rest } = props;
    const isActive = !!label;
    const propsForBem = { ...props, isActive };

    let buttonIcon;
    let buttonClick;

    if (isOpen) {
        buttonIcon = <IoIosArrowUp />;
        buttonClick = null;
    } else if (isActive) {
        buttonIcon = CROSS_CHAR;
        buttonClick = e => {
            e.stopPropagation();
            onClear();
        };
    } else {
        buttonIcon = <IoIosArrowDown />;
        buttonClick = null;
    }

    const handleKeyDown = e => {
        if (e.key === ENTER_KEY) {
            togglePopup();
        }
    };

    return (
        <div
            ref={ref}
            {...rest}
            {...block(propsForBem)}
            onClick={togglePopup}
            onKeyDown={handleKeyDown}
            tabIndex="0"
            role="button"
        >
            <div {...elem('label', propsForBem)}>{isActive && name}</div>
            <div {...elem('pill', propsForBem)}>
                <span {...elem('pillLabel', propsForBem)}>{label || name}</span>
                <button type="button" {...elem('button', propsForBem)} onClick={buttonClick}>
                    {buttonIcon}
                </button>
            </div>
        </div>
    );
});

PillButton.displayName = 'PillButton';

PillButton.propTypes = {
    /** Wether the popup is open or closed */
    isOpen: PropTypes.bool,
    /** a function to be called when popup should be toggled */
    togglePopup: PropTypes.func.isRequired,
    /** a function to be called to clear the pill/filter content */
    onClear: PropTypes.func.isRequired,
    /** name describing the pill/filter */
    name: PropTypes.string.isRequired,
    /** label describing the content of an active filter/pill */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

PillButton.defaultProps = {
    isOpen: false,
    label: null,
};

export default PillButton;
