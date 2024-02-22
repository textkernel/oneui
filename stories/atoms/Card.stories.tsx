import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@textkernel/oneui';

const meta: Meta<typeof Card> = {
    title: 'Atoms/Card',
    component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const _Card: Story = {
    args: {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quisquam libero, reiciendis adipisci.',
        subtitle: 'Sit quisquam libero, reiciendis adipisci.',
        trailing: 10,
    },
    render: (args) => <Card {...args} />,
};

export const _CardWithoutSubtitle: Story = {
    args: {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quisquam libero, reiciendis adipisci.',
        trailing: 0,
    },
    render: (args) => <Card {...args} />,
};

export const _CardWithoutTrailing: Story = {
    args: {
        title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quisquam libero, reiciendis adipisci.',
    },
    render: (args) => <Card {...args} />,
};
