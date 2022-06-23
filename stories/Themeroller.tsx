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
        let defaultTheme;
        try {
            const dafaultThemeString = sessionStorage.getItem(OneUI.THEME_ELEMENT_ID) || '';
            defaultTheme = JSON.parse(dafaultThemeString || '');
        } catch (err) {
            console.error(err);
        }
        return (
            <Themeroller
                inputLabel="Theme name"
                resetLabel="Reset to defaults"
                resetDefaultLabel="Revert to active theme"
                fileLabel="Import file"
                downloadLabel="Download"
                downloadTooltipLabel="Please specify the Theme name"
                config={THEMEROLLER_CONFIG}
                defaultTheme={defaultTheme}
                onChange={handleChange}
            />
        );
    });
