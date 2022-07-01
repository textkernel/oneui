import * as React from 'react';
import { bem } from '../../../utils';
import { TabsBar, TabItem } from '../../Tabs';
import { List, ListItem } from '../../List';
import { Text } from '../../Text';
import { ThemerollerConfig, ThemeItem } from '../../../themes/themerollerConfig';
import { ItemValue } from './ItemValue';
import styles from './ThemeTuner.scss';

type CssVars = {
    [key: string]: string;
};

interface Props {
    /** Themeroller config */
    config: ThemerollerConfig;
    /** Theme changed styles */
    cssVars: CssVars;
    /** callback is called on changing theme styles */
    onChange: (cssVars: CssVars) => void;
    /** component to be rendered inside Themeroller */
    children?: React.ReactNode;
}

const { elem } = bem('ThemeTuner', styles);

export const ThemeTuner: React.FC<Props> = ({ config, cssVars, children, onChange, ...rest }) => {
    const [activeTab, setActiveTab] = React.useState<string>(config[0]?.fieldsetName);
    const activeItems = config.find((fieldset) => fieldset.fieldsetName === activeTab)?.items || [];

    const handleItemChange = (item: ThemeItem) => {
        if (onChange) {
            onChange({
                ...cssVars,
                [item.var]: `${item.value}${item.type === 'unit' ? item.unit : ''}`,
            });
        }
    };

    const getItemValue = (item: ThemeItem): string => {
        if (cssVars[item.var] !== undefined) {
            if (item.type === 'unit') {
                return Number.parseFloat(cssVars[item.var]).toString();
            }
            return cssVars[item.var];
        }
        return item.value;
    };

    const itemRenderer = (item: ThemeItem) => (
        <ListItem {...elem('item')} key={item.label}>
            <Text {...elem('label')}>{item.label}</Text>
            <ItemValue item={{ ...item, value: getItemValue(item) }} onChange={handleItemChange} />
        </ListItem>
    );

    return (
        <div {...rest}>
            {children}
            <TabsBar activeTabId={activeTab} onSelect={setActiveTab}>
                {config.map((fieldset) => (
                    <TabItem key={fieldset.fieldsetName} tabId={fieldset.fieldsetName}>
                        {fieldset.fieldsetName}
                    </TabItem>
                ))}
            </TabsBar>
            <List>{activeItems.map((item) => itemRenderer(item))}</List>
        </div>
    );
};

ThemeTuner.displayName = 'ThemeTuner';

ThemeTuner.defaultProps = {
    children: undefined,
};
