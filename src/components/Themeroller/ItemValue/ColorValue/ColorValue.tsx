import * as React from 'react';
import { bem } from '../../../../utils';
import { Input } from '../../../Input';
import { Text } from '../../../Text';
import { ThemeColorItem } from '../../../../themes/themerollerConfig';
import styles from './ColorValue.scss';

type Props = {
    item: ThemeColorItem;
    onChange: (value: ThemeColorItem) => void;
};

const { elem } = bem('ColorValue', styles);

export const ColorValue: React.FC<Props> = ({ item, onChange }) => {
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
                type="color"
                size="small"
                value={item.value}
                onChange={handleOnChange}
            />
            <Text {...elem('value')} inline context="muted">
                {item.value}
            </Text>
        </span>
    );
};

ColorValue.displayName = 'ColorValue';

ColorValue.defaultProps = {};
