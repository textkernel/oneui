import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { LocationCard } from '@textkernel/oneui';

storiesOf('Molecules|LocationCard', module)
    .addDecorator(withKnobs)
    .add('LocationCard', () => (
        <LocationCard
            locationTitle={text('Location title', 'London')}
            distanceRadius={number('Distance radius', 42)}
            sliderLabel="+42 km"
            minRadius={number('Min radius', 1)}
            maxRadius={number('Max radius', 100)}
            radiusStep={number('Step', 1)}
            onRadiusChange={value => console.log(value)}
            onDelete={() => console.log('Delete')}
        />
    ));
