import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import LoadingSpinner from '../src/components/LoadingSpinner';
import { CONTEXTS } from '../src/constants';

storiesOf('LoadingSpinner', module)
    .addDecorator(withKnobs)
    .add('LoadingSpinner', () => (
        <LoadingSpinner
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            hidden={boolean('Hidden', false)}
            label={text('Label', 'Loading...')}
            size={number('Size', null)}
        />
    ));
