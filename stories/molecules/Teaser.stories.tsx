import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Teaser } from '@textkernel/oneui';

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
        primaryInfo: { text: 'Primary', href: 'https://google.com' },
        secondaryInfo: { text: 'Secondary' },
        tercearyInfo: { text: 'Terceary' },
        details: 'It was posted here',
        isVisited: true,
        timestamp: 'Today',
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
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <Teaser {...args} isSelected={isSelected} onChange={() => setIsSelected(!isSelected)} />
        );
    },
};

// export const WithOneStatus: Story = {
//     name: 'With one status',
//     args: {
//         title: <span title={titleText}>{titleText}</span>,
//         subtitle: 'Awsome inc.',
//         location: 'Melbourne',
//         details: 'It was posted here',
//         statuses: [
//             {
//                 label: 'Viewed',
//                 tooltip: 'Viewed one day ago',
//             },
//         ],
//     },
//     render: (args) => <Teaser {...args} />,
// };

// export const WithoutStatus: Story = {
//     name: 'Without statuses',
//     args: {
//         title: <span title={titleText}>{titleText}</span>,
//         subtitle: 'Awsome inc.',
//         location: 'Melbourne',
//         details: 'It was posted here',
//     },
//     render: (args) => <Teaser {...args} />,
// };
