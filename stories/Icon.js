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
    IconTextkernel,
    LogoTextkernel,
} from '@textkernel/oneui';
import { CONTEXTS, HEADING_SIZES } from '../src/constants';

const STORY_CONTEXTS = [...CONTEXTS, null];
const CONTEXT_DEFAULT = null;
const SIZE_DEFAULT = 48;

storiesOf('Atoms|Icons', module)
    .addDecorator(withKnobs)
    .add('Align with text', () => (
        <Heading level={select('Heading level', HEADING_SIZES, HEADING_SIZES[0])}>
            <IconSearch margin="right" />
            {text('Text', 'Some heading')}
        </Heading>
    ))
    .add('Extract! icon', () => (
        <IconExtract
            context={select('Context', STORY_CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Extract!')}
        />
    ))
    .add('Harvester icon', () => (
        <IconHarvester
            context={select('Context', STORY_CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Harvester')}
        />
    ))
    .add('Jobfeed icon', () => (
        <IconJobfeed
            context={select('Context', STORY_CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Jobfeed')}
        />
    ))
    .add('Match! icon', () => (
        <IconMatch
            context={select('Context', STORY_CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Match!')}
        />
    ))
    .add('Search! icon', () => (
        <IconSearch
            context={select('Context', STORY_CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Search!')}
        />
    ))
    .add('Sourcebox icon', () => (
        <IconSourcebox
            context={select('Context', STORY_CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Sourcebox')}
        />
    ))
    .add('Textkernel icon', () => (
        <IconTextkernel
            context={select('Context', STORY_CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Textkernel')}
        />
    ))
    .add('Textkernel logo', () => (
        <LogoTextkernel
            context={select('Context', STORY_CONTEXTS, CONTEXT_DEFAULT)}
            size={number('Size', SIZE_DEFAULT)}
            title={text('Title', 'Textkernel logo')}
        />
    ));
