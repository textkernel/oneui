import * as React from 'react';
import { bem } from '../../../../../utils';
import { Input } from '../../../../Input';
import { Text } from '../../../../Text';
import { ThemeUnitItem } from '../../../../../themes/themerollerConfig';
import styles from './UnitValue.scss';

type Props = {
    item: ThemeUnitItem;
    onChange: (value: ThemeUnitItem) => void;
};

const { elem } = bem('UnitValue', styles);

export const UnitValue: React.FC<Props> = ({ item, onChange }) => {
    const handleOnChange = (event) => {
        onChange({
            ...item,
            value: event.target.value,
        });
    };
    return (
        <span>
            <Input
                {...elem('input')}
                type="number"
                size="small"
                value={item.value}
                onChange={handleOnChange}
            />
            <Text {...elem('value')} inline context="muted">
                {item.value}
                {item.unit}
            </Text>
        </span>
    );
};

UnitValue.displayName = 'UnitValue';

UnitValue.defaultProps = {};
