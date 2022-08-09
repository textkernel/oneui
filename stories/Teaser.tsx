import * as React from 'react';
import { ComponentStory } from '@storybook/react';
import { Teaser } from '@textkernel/oneui';

export default {
    title: 'Molecules/Teaser',
    component: Teaser,
};

const Template: ComponentStory<typeof Teaser> = (args) => <Teaser {...args} />;
const titleText = 'My first job';

export const WithAllFields = Template.bind({});
WithAllFields.storyName = 'With all fields';
WithAllFields.args = {
    title: <span title={titleText}>{titleText}</span>,
    subTitle: 'Awsome inc.',
    location: 'Melbourne',
    details: 'It was posted here',
    statuses: [
        {
            label: 'Viewed',
            tooltip: 'Viewed one day ago',
        },
        {
            label: 'Imported',
            tooltip: 'Imported two days ago',
        },
    ],
};

export const WithOneStatus = Template.bind({});
WithOneStatus.storyName = 'With one status';
WithOneStatus.args = {
    title: <span title={titleText}>{titleText}</span>,
    subTitle: 'Awsome inc.',
    location: 'Melbourne',
    details: 'It was posted here',
    statuses: [
        {
            label: 'Viewed',
            tooltip: 'Viewed one day ago',
        },
    ],
};

export const WithoutStatuses = Template.bind({});
WithoutStatuses.storyName = 'Without statuses';
WithoutStatuses.args = {
    title: <span title={titleText}>{titleText}</span>,
    subTitle: 'Awsome inc.',
    location: 'Melbourne',
    details: 'It was posted here',
};
