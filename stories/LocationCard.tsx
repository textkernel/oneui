import * as React from 'react';
import { LocationCard } from '@textkernel/oneui';

export default {
    title: 'Molecules/LocationCard',
    component: LocationCard,
};

export const _LocationCard = (args) => <LocationCard {...args} />;
_LocationCard.args = {
    locationId: 'ajdo-219a-j19v-0491',
    locationTitle: 'London',
    hasRadius: true,
    distanceRadius: 42,
    sliderLabel: '+42 km',
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
};
