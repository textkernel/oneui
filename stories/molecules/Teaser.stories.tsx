import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag, Teaser } from '@textkernel/oneui';
import { FaInternetExplorer, FaLinkedinIn } from 'react-icons/fa';

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
        date: 'Today',
        primaryInfo: { text: 'Primary', href: 'https://textkernel.com' },
        secondaryInfo: { text: 'Secondary' },
        tercearyInfo: { text: 'Terceary' },
        sourceInfo: { text: 'Source', icon: <FaLinkedinIn /> },
        isVisited: true,
        matchingIndicatorPercentage: 50,
        bottom: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Tag bgColor="yellow" size="small">
                    First
                </Tag>
                <Tag bgColor="lightblue" size="small">
                    Second
                </Tag>
            </div>
        ),
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <Teaser {...args} isSelected={isSelected} onChange={() => setIsSelected(!isSelected)} />
        );
    },
};

export const VariantOne: Story = {
    name: 'Variant One',
    args: {
        title: 'John Doe',
        subtitle: 'Surgeon',
        hasCheckbox: true,
        primaryInfo: { text: 'Netherlands' },
        secondaryInfo: { text: 'example@example.com', href: 'mailto:example@example.com' },
        tercearyInfo: { text: '+99 989 989 989', href: 'tel:+99989989989' },
        isVisited: true,
        matchingIndicatorPercentage: 25,
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <Teaser {...args} isSelected={isSelected} onChange={() => setIsSelected(!isSelected)} />
        );
    },
};

export const VariantTwo: Story = {
    name: 'Variant Two',
    args: {
        title: 'John Doe',
        subtitle: 'Surgeon',
        hasCheckbox: true,
        primaryInfo: { text: 'Netherlands' },
        secondaryInfo: { text: 'example@example.com', href: 'mailto:example@example.com' },
        tercearyInfo: { text: '+99 989 989 989', href: 'tel:+99989989989' },
        sourceInfo: {
            text: 'Internet',
            icon: <FaInternetExplorer />,
        },
        isVisited: true,
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <Teaser {...args} isSelected={isSelected} onChange={() => setIsSelected(!isSelected)} />
        );
    },
};

export const VariantThree: Story = {
    name: 'Variant Three',
    args: {
        title: 'John Doe',
        subtitle: 'Surgeon',
        hasCheckbox: true,
        primaryInfo: { text: 'Netherlands' },
        secondaryInfo: { text: 'textkernel.nl', href: 'https://textkernel.nl' },
        isVisited: true,
        date: 'Today',
        bottom: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Tag bgColor="yellow" size="small" onDelete={() => console.log('Deleted')}>
                    First
                </Tag>
                <Tag bgColor="lightblue" size="small">
                    Second
                </Tag>
            </div>
        ),
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <Teaser {...args} isSelected={isSelected} onChange={() => setIsSelected(!isSelected)} />
        );
    },
};
