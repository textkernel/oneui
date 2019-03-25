import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withConsole } from '@storybook/addon-console';
import OneUITheme from './oneui.theme';

addDecorator(
    withInfo({
        inline: true
    })
);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addParameters({
    options: {
        theme: OneUITheme,
    }
});

function loadStories() {
    require('../stories/index.js');
}

configure(loadStories, module);
