import * as React from 'react';
import { ThemeConfig, ThemeItem } from '../../themes/themerollerConfig';

export type UseThemeConfig = [ThemeConfig, (item: ThemeItem) => ThemeConfig, () => void];

export const useThemeConfig = (initialConfig: ThemeConfig): UseThemeConfig => {
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
