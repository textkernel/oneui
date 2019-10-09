import { storiesOf } from '@storybook/react';

storiesOf('Concepts|Arrangment of z-indices', module).add('Arrangment of z-indices', () => null, {
    info: {
        text: `
            ## Declared layers for arranging components:

            [0-399] — regular components

            [400-699] — pop-ups, tooltips

            [700-999] — modal windows, top-layer pop-ups
            `,
        source: null,
    },
});
