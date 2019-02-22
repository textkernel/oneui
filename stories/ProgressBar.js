import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import { ProgressBar } from '@textkernel/oneui';
import { CONTEXTS } from '@textkernel/oneui/constants';

storiesOf('ProgressBar', module)
    .addDecorator(withKnobs)
    .add('ProgressBar', () => (
        <ProgressBar
            animated={boolean('Animated', true)}
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            hidden={boolean('Hidden', false)}
            percentage={number('Percentage', 50)}
            small={boolean('Small', false)}
        >
            {text('Label', 'Loading...')}
        </ProgressBar>
    ));
