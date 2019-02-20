import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Checkbox from '../../Checkbox';
import Text from '../../Text';
import { DropdownConsumer } from '../DropdownContext';
import { escapeRegExp } from '../../../utils';
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
            {({ filterValue, multiselect, onChange, selection }) => {
                const re = new RegExp(`(${escapeRegExp(filterValue || '')})`, 'gi');

                if (filterValue && !(children || '').match(re)) {
                    return null;
                }

                return (
                    <div {...block(props)}>
                        {multiselect ? (
                            <Checkbox
                                id={`item-${value}`}
                                {...elem('node', props)}
                                checked={selection && selection.indexOf(value) > -1}
                                disabled={disabled}
                                onChange={e => {
                                    onChange(e.target.value, children);
                                }}
                                value={value}
                            >
                                {children}
                            </Checkbox>
                        ) : (
                            <div {...elem('node', props)}>
                                <Text inline>{children}</Text>
                            </div>
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
