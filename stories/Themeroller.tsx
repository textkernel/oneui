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
        let themeResultData;
        try {
            themeResultData = JSON.parse(sessionStorage.getItem(OneUI.THEME_ELEMENT_ID) || '');
        } catch (err) {
            console.error(err);
        }
        return (
            <Themeroller
                inputLabel="Theme name"
                resetLabel="Reset"
                fileLabel="Choose file"
                downloadLabel="Download"
                downloadTooltipLabel="Please specify the Theme name"
                config={THEMEROLLER_CONFIG}
                themeResultData={themeResultData}
                onChange={handleChange}
            />
        );
    });
