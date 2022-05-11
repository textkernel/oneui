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

export interface ThemeNumberItem extends ThemeBaseItem {
    type: 'number';
}

export interface ThemeUnitItem extends ThemeBaseItem {
    type: 'unit';
    unit: 'px' | 's';
}

export type ThemeItem = ThemeColorItem | ThemeUnitItem | ThemeStringItem | ThemeNumberItem;

export type ThemeFieldset = {
    fieldsetName: string;
    items: ThemeItem[];
};

export type ThemeConfig = ThemeFieldset[];
