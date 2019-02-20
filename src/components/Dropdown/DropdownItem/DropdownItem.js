import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Checkbox from '../../Checkbox';
import Text from '../../Text';
import { DropdownConsumer } from '../DropdownContext';
import { isStringMatch } from '../../../utils';
import styles from './DropdownItem.scss';

const { block, elem } = bem({
    name: 'DropdownItem',
    classnames: styles,
    propsToMods: []
});

const DropdownItem = props => {
    const { children, disabled, value } = props;

    return (
        <DropdownConsumer>
            {({ filterValue, handleChange, multiselect, selection }) => {
                if (!isStringMatch(filterValue, children)) {
                    return null;
                }

                return (
                    <div {...block(props)} role="menuitem">
                        {multiselect ? (
                            <Checkbox
                                id={`item-${value}`}
                                {...elem('node', props)}
                                checked={selection && selection.indexOf(value) > -1}
                                disabled={disabled}
                                onChange={() => {
                                    handleChange({ value, label: children });
                                }}
                                value={value}
                            >
                                {children}
                            </Checkbox>
                        ) : (
                            <button
                                {...elem('node', props)}
                                onClick={() => {
                                    handleChange({ value, label: children });
                                }}
                            >
                                <Text inline>{children}</Text>
                            </button>
                        )}
                    </div>
                );
            }}
        </DropdownConsumer>
    );
};

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
    disabled: PropTypes.bool,
    grouped: PropTypes.bool
};

DropdownItem.defaultProps = {
    disabled: false,
    grouped: false
};

export default DropdownItem;
