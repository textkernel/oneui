import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withConsole } from '@storybook/addon-console';
import OneUI from '@textkernel/oneui';
import { OneUITheme } from './oneui.theme';

addDecorator(
    withInfo({
        inline: true,
    })
);

addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addParameters({
    options: {
        theme: OneUITheme,
    },
});

OneUI.init(); //.then(() => {
// configure(loadStories, module);
//});
