import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { CROSS_CHAR } from '../../../constants';
import styles from './PillButton.scss';

const { block, elem } = bem({
    name: 'PillButton',
    classnames: styles,
    propsToMods: ['isActive', 'isOpen'],
});

const PillButton = React.forwardRef((props, ref) => {
    const { isOpen, togglePopup, onClear, label, contentLabel, ...rest } = props;
    const isActive = !!contentLabel;
    const propsForBem = { ...props, isActive };

    const getButton = () => {
        if (isOpen) return { icon: <IoIosArrowUp />, onClick: () => null };
        if (isActive)
            return {
                icon: CROSS_CHAR,
                onClick: e => {
                    e.preventPropagation();
                    onClear();
                },
            };
        return { icon: <IoIosArrowDown />, onClick: () => null };
    };

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div ref={ref} {...rest} {...block(propsForBem)} onClick={togglePopup}>
            <div {...elem('label', propsForBem)}>{isActive && label}</div>
            <div {...elem('pill', propsForBem)}>
                <span {...elem('pillLabel', propsForBem)}>{contentLabel || label}</span>
                <button
                    type="button"
                    {...elem('button', propsForBem)}
                    onClick={getButton().onClick}
                >
                    {getButton().icon}
                </button>
            </div>
        </div>
    );
});

PillButton.displayName = 'PillButton';

PillButton.propTypes = {
    /** Wether the popup is open or closed */
    isOpen: PropTypes.bool.isRequired,
    /** a function to be called when popup should be toggled */
    togglePopup: PropTypes.func.isRequired,
    /** a function to be called to clear the pill/filter content */
    onClear: PropTypes.func.isRequired,
    /** label describing the pill/filter */
    label: PropTypes.string.isRequired,
    /** label describing the content of an active filter/pill */
    contentLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

PillButton.defaultProps = {
    contentLabel: null,
};

export default PillButton;
