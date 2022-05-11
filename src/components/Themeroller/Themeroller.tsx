import * as React from 'react';
import { bem } from '../../utils';
import { TabsBar, TabItem } from '../Tabs';
import { List, ListItem } from '../List';
import { Text } from '../Text';
import { ThemeConfig, ThemeItem } from '../../themes/themerollerConfig';
import { ItemValue } from './ItemValue';
import { useThemeConfig } from './useThemeConfig';
import styles from './Themeroller.scss';

type CssVars = {
    [key: string]: string;
};

export type ThemerollerChildrenProps = {
    cssVars: CssVars;
    reset: () => void;
};
interface Props {
    themeConfig: ThemeConfig;
    children?: ({ cssVars, reset }: ThemerollerChildrenProps) => React.ReactNode;
    onGenerate?: (cssVars: CssVars) => void;
}

const { elem } = bem('Themeroller', styles);

export const Themeroller: React.FC<Props> = ({
    themeConfig: initialThemeConfig,
    children,
    onGenerate,
}) => {
    const [activeTab, setActiveTab] = React.useState<string>(initialThemeConfig[0]?.fieldsetName);
    const [themeConfig, changeThemeConfig, resetThemeConfig] = useThemeConfig(initialThemeConfig);
    const activeItems =
        themeConfig.find((fieldset) => fieldset.fieldsetName === activeTab)?.items || [];

    const getVars = (config: ThemeConfig): CssVars => {
        const result: CssVars = {};
        config.forEach((fieldset) => {
            fieldset.items.forEach((item) => {
                result[item.var] = `${item.value}${item.type === 'unit' ? item.unit : ''}`;
            });
        });
        return result;
    };

    const cssVars = React.useMemo(() => getVars(themeConfig), [themeConfig]);

    React.useEffect(() => {
        if (onGenerate) {
            onGenerate(cssVars);
        }
    }, [cssVars]);

    const itemRenderer = (item: ThemeItem) => (
        <ListItem {...elem('item')} key={item.label}>
            <Text {...elem('label')}>{item.label}</Text>
            <ItemValue item={item} onChange={changeThemeConfig} />
        </ListItem>
    );

    return (
        <div>
            <TabsBar activeTabId={activeTab} onSelect={setActiveTab}>
                {themeConfig.map((fieldset) => (
                    <TabItem key={fieldset.fieldsetName} tabId={fieldset.fieldsetName}>
                        {fieldset.fieldsetName}
                    </TabItem>
                ))}
            </TabsBar>
            <List {...elem('list')}>{activeItems.map((item) => itemRenderer(item))}</List>
            {children &&
                children({
                    cssVars,
                    reset: resetThemeConfig,
                })}
        </div>
    );
};

Themeroller.displayName = 'Themeroller';

Themeroller.defaultProps = {
    children: undefined,
    onGenerate: undefined,
};
