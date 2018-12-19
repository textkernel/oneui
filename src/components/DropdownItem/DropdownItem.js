/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Checkbox from '../Checkbox';
import styles from './DropdownItem.scss';

class DropdownItem extends PureComponent {
    render() {
        const {
            checkbox,
            checked,
            children,
            disabled,
            isStatic,
            onClick,
            onSelect,
            value,
            ...rest
        } = this.props;

        if (checkbox) {
            return (
                <div {...rest} {...this.block()}>
                    <Checkbox
                        checked={checked}
                        disabled={disabled}
                        onChange={() => {
                            if (disabled) {
                                return false;
                            }
                            if (onSelect) {
                                onSelect(value);
                            }
                            return true;
                        }}
                        value={value}
                        {...this.elem('checkbox')}
                    >
                        {children}
                    </Checkbox>
                </div>
            );
        }

        return (
            <div
                {...rest}
                {...this.block()}
                onClick={() => {
                    if (disabled) {
                        return false;
                    }
                    if (onClick) {
                        onClick(value);
                    }
                    if (onSelect) {
                        onSelect(value);
                    }
                    return true;
                }}
                role="menuitem"
            >
                {children}
            </div>
        );
    }
}

DropdownItem.propTypes = {
    /** If the dropdown item is checked */
    checked: PropTypes.bool,
    /** True if the dropdown item should have a checkbox
     Used in case of a multiselect dropdown */
    checkbox: PropTypes.bool,
    /** Item label */
    children: PropTypes.node.isRequired,
    /** Whether the item is disabled */
    disabled: PropTypes.bool,
    /** Callback function, fired when item is clicked */
    onClick: PropTypes.func,
    /** Callback function, fired when item is selected */
    onSelect: PropTypes.func,
    /** If true, this item is not meant for user interaction */
    isStatic: PropTypes.bool,
    /** Selected value of this item */
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

DropdownItem.defaultProps = {
    checked: false,
    checkbox: false,
    disabled: false,
    onClick: null,
    onSelect: null,
    isStatic: false,
    value: null
};

DropdownItem.propsToMods = ['checkbox', 'disabled', 'isStatic'];

export default bem(styles)(DropdownItem);
