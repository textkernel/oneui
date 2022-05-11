import * as React from 'react';
import { Input } from '../../../Input';
import { ThemeStringItem } from '../../../../themes/themerollerConfig';

type Props = {
    item: ThemeStringItem;
    onChange: (value: ThemeStringItem) => void;
};

export const StringValue: React.FC<Props> = ({ item, onChange }) => {
    const handleOnChange = (event) => {
        onChange({
            ...item,
            value: event.target.value,
        });
    };
    return <Input type="text" size="small" value={item.value} onChange={handleOnChange} />;
};

StringValue.displayName = 'StringValue';

StringValue.defaultProps = {};
