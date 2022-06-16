import * as React from 'react';
import { Input } from '../../../../Input';
import { ThemeNumberItem } from '../../../../../themes/themerollerConfig';

interface Props {
    item: ThemeNumberItem;
    onChange: (value: ThemeNumberItem) => void;
}

export const NumberValue: React.FC<Props> = ({ item, onChange }) => {
    const handleOnChange = (event) => {
        onChange({
            ...item,
            value: event.target.value,
        });
    };
    return <Input type="number" size="small" value={item.value} onChange={handleOnChange} />;
};

NumberValue.displayName = 'NumberValue';

NumberValue.defaultProps = {};
