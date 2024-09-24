import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag, Teaser } from '@textkernel/oneui';
import { FaLinkedinIn } from 'react-icons/fa';

const titleText = 'My first job';

const meta: Meta<typeof Teaser> = {
    title: 'Molecules/Teaser',
    component: Teaser,
};

export default meta;

type Story = StoryObj<typeof Teaser>;

export const WithAllFields: Story = {
    name: 'With all fields',
    args: {
        title: titleText,
        subtitle: 'Awsome inc.',
        hasCheckbox: true,
        timestamp: 'Today',
        primaryInfo: { text: 'Primary', href: 'https://textkernel.com' },
        secondaryInfo: { text: 'Secondary' },
        tercearyInfo: { text: 'Terceary' },
        sourceInfo: { text: 'Source', icon: <FaLinkedinIn /> },
        isVisited: true,
        matchingIndicatorPercentage: 50,
        tags: [<Tag bgColor="yellow">First</Tag>, <Tag bgColor="lightblue">Second</Tag>],
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <Teaser {...args} isSelected={isSelected} onChange={() => setIsSelected(!isSelected)} />
        );
    },
};
