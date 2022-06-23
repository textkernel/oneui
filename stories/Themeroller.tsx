import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import OneUI, { Themeroller, THEMEROLLER_CONFIG } from '@textkernel/oneui';

storiesOf('Theme|Themeroller', module)
    .addDecorator(withKnobs)
    .add('Theme builder', () => {
        const handleChange = (themeResult) => {
            sessionStorage.setItem(OneUI.THEME_ELEMENT_ID, JSON.stringify(themeResult));
        };
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
                inputLabel="Theme name"
                resetLabel="Reset to defaults"
                resetActiveLabel={hasActiveTheme ? 'Revert to active theme' : undefined}
                fileLabel="Import file"
                downloadLabel="Download"
                downloadTooltipLabel="Please specify the Theme name"
                config={THEMEROLLER_CONFIG}
                activeTheme={activeTheme}
                onChange={handleChange}
            />
        );
    });
