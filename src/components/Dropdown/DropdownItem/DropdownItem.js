import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import Checkbox from '../../Checkbox';
import Text from '../../Text';
import { DropdownConsumer } from '../DropdownContext';
import styles from './DropdownItem.scss';

const { block, elem } = bem({
    name: 'DropdownItem',
    classnames: styles,
    propsToMods: []
});

const DropdownItem = props => {
    const { children } = props;

    return (
        <DropdownConsumer>
            {({ multiselect }) => (
                <div {...block(props)}>
                    {multiselect ? (
                        <div {...elem('multi', props)}>
                            <Checkbox>{children}</Checkbox>
                        </div>
                    ) : (
                        <div {...elem('single', props)}>
                            <Text inline>{children}</Text>
                        </div>
                    )}
                </div>
            )}
        </DropdownConsumer>
    );
};

DropdownItem.displayName = 'DropdownItem';

DropdownItem.propTypes = {
    disabled: PropTypes.bool
};

DropdownItem.defaultProps = {
    disabled: false
};

export default DropdownItem;
