import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withConsole } from '@storybook/addon-console';

addDecorator(
    withInfo({
        inline: true
    })
);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

function loadStories() {
    require('../stories/index.js');
}

configure(loadStories, module);
