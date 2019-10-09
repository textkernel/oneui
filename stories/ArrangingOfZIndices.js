import { storiesOf } from '@storybook/react';

storiesOf('Concepts|Arrangment of z-indices', module).add('Arrangment of z-indices', () => null, {
    info: {
        text: `
            ## Declared layers for arranging components:

            [0-400] — regular components

            [401-700] — pop-ups, tooltips

            ..>701 — modal windows, top-layer pop-ups
            `,
        source: null,
    },
});
