import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { LocationCard } from '@textkernel/oneui';

storiesOf('LocationCard', module)
    .addDecorator(withKnobs)
    .add('LocationCard', () => <LocationCard />);
