import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { number, select, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import LoadingSpinner from '../src/components/LoadingSpinner';
import { CONTEXTS } from '../src/constants';

storiesOf('LoadingSpinner', module)
    .addDecorator(withKnobs)
    .add('LoadingSpinner', () => (
        <LoadingSpinner
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            size={number('Size', null)}
        />
    ));
