interface ThemeBaseItem {
    label: string;
    type: unknown;
    var: string;
    value: string;
}

export interface ThemeColorItem extends ThemeBaseItem {
    type: 'color';
}

export interface ThemeStringItem extends ThemeBaseItem {
    type: 'string';
}

export interface ThemeSizeItem extends ThemeBaseItem {
    type: 'size';
    unit: 'px' | 's';
}

export type ThemeItem = ThemeColorItem | ThemeSizeItem | ThemeStringItem;

export type ThemeFieldset = {
    fieldsetName: string;
    items: ThemeItem[];
};

export type ThemeConfig = ThemeFieldset[];
