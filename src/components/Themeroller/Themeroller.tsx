import * as React from 'react';
import { bem } from '../../utils';
import { TabsBar, TabItem } from '../Tabs';
import { List, ListItem } from '../List';
import { Text } from '../Text';
import { ThemeConfig, ThemeItem } from './themeConfigTypes';
import { ItemValue } from './ItemValue';
import styles from './Themeroller.scss';

type CSSVars = {
    [key: string]: string;
};

type ChildrenProps = {
    cssVars: CSSVars;
    reset: () => void;
};
interface Props {
    /** Theme */
    themeConfig: ThemeConfig;
    children?: ({ cssVars, reset }: ChildrenProps) => React.ReactNode;
    onGenerate?: (cssVars: CSSVars) => void;
}

const { elem } = bem('Themeroller', styles);

type UseThemeConfig = [ThemeConfig, (item: ThemeItem) => ThemeConfig, () => void];

const useThemeConfig = (initialConfig: ThemeConfig): UseThemeConfig => {
    const [config, setConfig] = React.useState<ThemeConfig>(initialConfig);
    const changeConfig = (item: ThemeItem) => {
        const modifiedThemeConfig = config.map((fieldset) => {
            return {
                ...fieldset,
                items: fieldset.items.map((i) => (i.var === item.var ? item : i)),
            };
        });
        setConfig(modifiedThemeConfig);
        return modifiedThemeConfig;
    };
    const resetConfig = () => setConfig(initialConfig);
    return [config, changeConfig, resetConfig];
};

export const Themeroller: React.FC<Props> = ({
    themeConfig: initialThemeConfig,
    children,
    onGenerate,
}) => {
    const [activeTab, setActiveTab] = React.useState<string>(initialThemeConfig[0]?.fieldsetName);
    const [themeConfig, changeThemeConfig, resetThemeConfig] = useThemeConfig(initialThemeConfig);
    const activeItems =
        themeConfig.find((fieldset) => fieldset.fieldsetName === activeTab)?.items || [];

    const getVars = (config: ThemeConfig): CSSVars => {
        const result: CSSVars = {};
        config.forEach((fieldset) => {
            fieldset.items.forEach((item) => {
                result[item.var] = `${item.value}${'unit' in item ? item.unit : ''}`;
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
};
