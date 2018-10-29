import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(
    withInfo({
        inline: true
    })
);

function loadStories() {
    require('../stories/index.js');
}

configure(loadStories, module);
