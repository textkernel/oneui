import * as React from 'react';
import { bem } from '../../../../utils';
import { Input } from '../../../Input';
import { Text } from '../../../Text';
import { ThemeSizeItem } from '../../../../themes/themerollerConfig';
import styles from './SizeValue.scss';

type Props = {
    item: ThemeSizeItem;
    onChange: (value: ThemeSizeItem) => void;
};

const { elem } = bem('SizeValue', styles);

export const SizeValue: React.FC<Props> = ({ item, onChange }) => {
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

SizeValue.displayName = 'SizeValue';

SizeValue.defaultProps = {};
