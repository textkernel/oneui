import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LocationCard } from '@textkernel/oneui';

const meta: Meta<typeof LocationCard> = {
    title: 'Molecules/LocationCard',
    component: LocationCard,
};

export default meta;

type Story = StoryObj<typeof LocationCard>;

export const _LocationCard: Story = {
    name: 'LocationCard',
    args: {
        locationId: 'ajdo-219a-j19v-0491',
        locationTitle: 'London',
        hasRadius: true,
        distanceRadius: 42,
        sliderLabel: '+42 km',
        minRadius: 1,
        maxRadius: 100,
        radiusStep: 1,
    },
    render: (args) => <LocationCard {...args} />,
};
