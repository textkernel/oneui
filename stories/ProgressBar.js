import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import ProgressBar from '../src/components/ProgressBar';
import { CONTEXTS } from '../src/constants';

storiesOf('ProgressBar', module)
    .addDecorator(withKnobs)
    .add('ProgressBar', () => (
        <ProgressBar
            animated={boolean('Animated', true)}
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            hidden={boolean('Hidden', false)}
            label={text('Label', 'Loading...')}
            percentage={number('Percentage', 50)}
        />
    ));
