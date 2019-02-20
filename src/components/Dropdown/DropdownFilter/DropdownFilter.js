import React from 'react';
import bem from 'bem';
import Input from '../../Input';
import { DropdownConsumer } from '../DropdownContext';
import styles from './DropdownFilter.scss';

const { block } = bem({
    name: 'DropdownFilter',
    classnames: styles,
    propsToMods: []
});

const DropdownFilter = props => (
    <DropdownConsumer>
        {({ filterValue, setFilter }) => (
            <div {...block(props)}>
                <Input {...props} isBlock onChange={setFilter} value={filterValue || ''} />
            </div>
        )}
    </DropdownConsumer>
);

DropdownFilter.displayName = 'DropdownFilter';

export default DropdownFilter;
