interface ThemeBaseItem {
    label: string;
    type: unknown;
    var: string;
    value: string;
}

/**
 * Used for specifying color CSS properties.
 * E.g. `background-color` property `value: '#ffffff'`.
 */
export interface ThemeColorItem extends ThemeBaseItem {
    type: 'color';
}

/**
 * Used for specifying string CSS properties.
 * E.g. `display` property `value: 'display-block'`.
 */
export interface ThemeStringItem extends ThemeBaseItem {
    type: 'string';
}

/**
 * Used for specifying number CSS properties.
 * E.g. `z-index` property `value: '200'`.
 */
export interface ThemeNumberItem extends ThemeBaseItem {
    type: 'number';
}

/**
 * Used for specifying CSS properties that have units.
 * Supported units:
 *  - `ps` is pixels value;
 *  - `s` is seconds value;
 * E.g. `width` property `value: '12', unit: 'px'`, then the value of CSS property is `12px`.
 */
export interface ThemeUnitItem extends ThemeBaseItem {
    type: 'unit';
    unit: 'px' | 's';
}

export type ThemeItem = ThemeColorItem | ThemeUnitItem | ThemeStringItem | ThemeNumberItem;

export type ThemeFieldset = {
    fieldsetName: string;
    items: ThemeItem[];
};

export type ThemerollerConfig = ThemeFieldset[];
