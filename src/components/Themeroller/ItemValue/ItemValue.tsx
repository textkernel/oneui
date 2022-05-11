import * as React from 'react';
import { ThemeItem } from '../../../themes/themerollerConfig';
import { ColorValue } from './ColorValue';
import { StringValue } from './StringValue';
import { NumberValue } from './NumberValue';
import { SizeValue } from './SizeValue';

type Props = {
    item: ThemeItem;
    onChange: (item: ThemeItem) => void;
};

export const ItemValue: React.FC<Props> = ({ item, onChange }) => {
    switch (item.type) {
        case 'color':
            return <ColorValue item={item} onChange={onChange} />;
        case 'string':
            return <StringValue item={item} onChange={onChange} />;
        case 'number':
            return <NumberValue item={item} onChange={onChange} />;
        case 'unit':
            return <SizeValue item={item} onChange={onChange} />;
        default:
            return null;
    }
};

ItemValue.displayName = 'ItemValue';

ItemValue.defaultProps = {};
