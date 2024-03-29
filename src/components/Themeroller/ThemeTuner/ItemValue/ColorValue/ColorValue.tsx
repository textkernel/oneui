import * as React from 'react';
import { bem } from '../../../../../utils';
import { Input } from '../../../../Input';
import { Text } from '../../../../Text';
import { ThemeColorItem } from '../../../../../themes/themerollerConfig';
import styles from './ColorValue.scss';

interface Props {
    item: ThemeColorItem;
    onChange: (value: ThemeColorItem) => void;
    ariaRole?: string;
}

const { elem } = bem('ColorValue', styles);

export const ColorValue: React.FC<Props> = ({ item, onChange, ariaRole }) => {
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
                role={ariaRole}
            />
            <Text {...elem('value')} inline context="neutral">
                {item.value}
            </Text>
        </span>
    );
};

ColorValue.displayName = 'ColorValue';
