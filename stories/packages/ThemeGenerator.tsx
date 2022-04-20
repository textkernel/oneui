import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';
import { OneUITheme, ThemeGenerator } from '@textkernel/oneui';

storiesOf('packages|ThemeGenerator', module)
    .addDecorator(withKnobs)
    .add('ThemeGenerator', () => {
        const fontGroup = 'Fonts';
        const colorGroup = 'Colors';
        const oneUITheme = new ThemeGenerator(OneUITheme);
        const customVariables = {
            '--font-size-base': `${number('Base Font Size', 14, undefined, fontGroup)}px`,
            '--color-brand': color('Brand Color', '#0097d1', colorGroup),
            '--color-neutral': color('Neutral Color', '#d0d1d5', colorGroup),
            '--color-muted': color('Muted Color', '#b3b2b2', colorGroup),
            '--color-info': color('Info Color', '#60c4de', colorGroup),
            '--color-accent': color('Accent Color', '#182642', colorGroup),
            '--color-good': color('Good Color', '#5cb85c', colorGroup),
            '--color-warning': color('Warning Color', '#ffb819', colorGroup),
            '--color-bad': color('Bad Color', '#f42534', colorGroup),
        };
        const oneUICssVariables = oneUITheme.generate(customVariables);
        return (
            <div>
                <pre>{oneUICssVariables}</pre>
            </div>
        );
    });
