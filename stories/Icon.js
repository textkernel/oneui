import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { number, select, text, withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line import/no-extraneous-dependencies
import Heading from '../src/components/Heading';
import Icon from '../src/components/Icon';
import { CONTEXTS, HEADING_SIZES, ICONS } from '../src/constants';

storiesOf('Icon', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <Icon
            context={select('Context', CONTEXTS, CONTEXTS[1])}
            name={select('Name', Object.keys(ICONS), Object.keys(ICONS)[0])}
            size={number('Size', 48)}
            title={text('Title', 'Icon')}
        />
    ))
    .add('Align with text', () => (
        <Heading level={select('Heading level', HEADING_SIZES, HEADING_SIZES[0])}>
            <Icon
                name={select('Icon name', Object.keys(ICONS), Object.keys(ICONS)[0])}
                style={{
                    marginRight: '.25em'
                }}
            />
            {text('Text', 'Some heading')}
        </Heading>
    ));
