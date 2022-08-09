import * as React from 'react';
import OneUI, { Themeroller, THEMEROLLER_CONFIG } from '@textkernel/oneui';

export default {
    title: 'Theme/Themeroller',
    component: Themeroller,
};

const handleChange = (themeResult) => {
    sessionStorage.setItem(OneUI.THEME_ELEMENT_ID, JSON.stringify(themeResult));
};

export const ThemeBuilder = (args) => {
    let activeTheme;
    let hasActiveTheme;
    try {
        activeTheme = JSON.parse(sessionStorage.getItem(OneUI.THEME_ELEMENT_ID) || '' || '');
        hasActiveTheme = Object.keys(activeTheme.theme.cssVariables).length;
    } catch (err) {
        console.error(err);
    }
    return (
        <Themeroller
            {...args}
            resetActiveLabel={hasActiveTheme ? 'Revert to active theme' : undefined}
            activeTheme={activeTheme}
        />
    );
};
ThemeBuilder.storyName = 'Theme builder';
ThemeBuilder.args = {
    inputLabel: 'Theme name',
    resetLabel: 'Reset to defaults',
    fileLabel: 'Import file',
    downloadLabel: 'Download',
    downloadTooltipLabel: 'Please specify the Theme name',
    config: THEMEROLLER_CONFIG,
    onChange: handleChange,
};
