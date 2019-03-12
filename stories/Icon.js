import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number, text, withKnobs } from '@storybook/addon-knobs';
import {
    Heading,
    IconExtract,
    IconHarvester,
    IconJobfeed,
    IconMatch,
    IconSearch,
    IconSourcebox,
    IconTextkernel
} from '@textkernel/oneui';
import { CONTEXTS, HEADING_SIZES } from '../src/constants';

const CONTEXT_DEFAULT = CONTEXTS[1];
const SIZE_DEFAULT = 48;

storiesOf('Icons', module)
    .addDecorator(withKnobs)
    .add('Align with text', () => (
        <Heading level={select('Heading level', HEADING_SIZES, HEADING_SIZES[0])}>
            <IconSearch margin="right" />
            {text('Text', 'Some heading')}
        </Heading>
    ))
    .add('Extract! icon', () => (
        <IconExtract
            context={select('Context', CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Extract!')}
        />
    ))
    .add('Harvester icon', () => (
        <IconHarvester
            context={select('Context', CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Harvester')}
        />
    ))
    .add('Jobfeed icon', () => (
        <IconJobfeed
            context={select('Context', CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Jobfeed')}
        />
    ))
    .add('Match! icon', () => (
        <IconMatch
            context={select('Context', CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Match!')}
        />
    ))
    .add('Search! icon', () => (
        <IconSearch
            context={select('Context', CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Search!')}
        />
    ))
    .add('Sourcebox icon', () => (
        <IconSourcebox
            context={select('Context', CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Sourcebox')}
        />
    ))
    .add('Textkernel icon', () => (
        <IconTextkernel
            context={select('Context', CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Textkernel')}
        />
    ));
