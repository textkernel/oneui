import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { LocationCard } from '@textkernel/oneui';

storiesOf('Molecules|LocationCard', module)
    .addDecorator(withKnobs)
    .add('LocationCard', () => (
        <LocationCard
            locationId="ajdo-219a-j19v-0491"
            locationTitle={text('Location title', 'London')}
            distanceRadius={number('Distance radius', 42)}
            sliderLabel={text('Slider label', '+42 km')}
            minRadius={number('Min radius', 1)}
            maxRadius={number('Max radius', 100)}
            radiusStep={number('Step', 1)}
            onRadiusChange={value => console.log(value)}
            onDelete={id => console.log(`onDelete is called for ${id}`)}
        />
    ));
