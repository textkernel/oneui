import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { number, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Icon from '../src/components/Icon';
import { CONTEXTS, ICONS } from '../src/constants';

storiesOf('Icon', module)
    .addDecorator(withKnobs)
    .add('Default behavior', () => (
        <Icon
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            name={select('Name', Object.keys(ICONS), Object.keys(ICONS)[0])}
            size={number('Size', 48)}
            title={text('Title', 'Icon')}
        />
    ));
