import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListItem, Tag, Teaser } from '@textkernel/oneui';
import { FaAddressBook, FaInternetExplorer } from 'react-icons/fa';

const meta: Meta<typeof Teaser> = {
    title: 'Molecules/Teaser',
    component: Teaser,
};

export default meta;

type Story = StoryObj<typeof Teaser>;

export const WithAllFields: Story = {
    name: 'With all fields',
    args: {
        title: 'John Doe is a known placeholder name in the tech field accross the world',
        subtitle: 'John Doe is a known placeholder name in the tech field accross the world',
        hasCheckbox: true,
        checkboxTooltip: {
            content: 'Tooltip example text',
        },
        date: 'about a month ago',
        primaryInfo: {
            text: 'John Doe is a known placeholder name in the tech field accross the world',
        },
        secondaryInfo: {
            text: 'John Doe is a known placeholder name in the tech field accross the world',
            href: 'https://textkernel.nl',
        },
        tercearyInfo: {
            text: 'John Doe is a known placeholder name in the tech field accross the world',
        },
        sourceInfo: { text: 'textkernel.nl (+ 4 more)', icon: <FaAddressBook /> },
        isVisited: true,
        matchingIndicatorPercentage: 50,
        bottom: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Tag bgColor="yellow">First</Tag>
                <Tag bgColor="lightblue">Second</Tag>
            </div>
        ),
        disabled: true,
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <div>
                <p>Border is just to show the width (500px) of the component</p>
                <p>Disabled component, title text is gray</p>
                <div style={{ width: '500px', border: '1px solid black' }}>
                    <Teaser
                        {...args}
                        isSelected={isSelected}
                        onChange={() => setIsSelected(!isSelected)}
                    />
                </div>
            </div>
        );
    },
};

export const WithoutCheckbox: Story = {
    name: 'Without checkbox',
    args: {
        title: 'John Doe is a very known person in the IT field accross the world',
        subtitle: 'Surgeon',
        primaryInfo: { text: 'Netherlands' },
        sourceInfo: { text: 'textkernel.nl (+ 4 more)', href: 'https://textkernel.nl' },
        date: 'about 1 month ago',
        bottom: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Tag bgColor="yellow" onDelete={() => console.log('Deleted')}>
                    First
                </Tag>
                <Tag bgColor="lightblue">Second</Tag>
            </div>
        ),
    },
    render: (args) => (
        <div>
            <p>Border is just to show the width (500px) of the component</p>
            <div style={{ width: '500px', border: '1px solid black' }}>
                <Teaser {...args} />
            </div>
        </div>
    ),
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
        date: 'about a month ago',
    },
    render: (args) => {
        const [isSelected, setIsSelected] = React.useState(false);

        return (
            <ListItem>
                <Teaser
                    {...args}
                    isSelected={isSelected}
                    onChange={() => setIsSelected(!isSelected)}
                />
            </ListItem>
        );
    },
};

export const VariantThree: Story = {
    name: 'Variant Three',
    args: {
        title: 'John Doe',
        subtitle: 'Super company you want to work for',
        hasCheckbox: true,
        primaryInfo: { text: 'Netherlands' },
        secondaryInfo: { text: 'textkernel.nl', href: 'https://textkernel.nl' },
        isVisited: true,
        date: 'Today',
        bottom: (
            <div style={{ display: 'flex', gap: '8px' }}>
                <Tag bgColor="yellow" onDelete={() => console.log('Deleted')}>
                    First
                </Tag>
                <Tag bgColor="lightblue">Second</Tag>
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
