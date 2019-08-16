import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, withKnobs } from '@storybook/addon-knobs';
import LocationSelector from '../src/components/LocationSelector';

const selectedLocations = [
    {
        locationId: 'ajdo-219a-j19v-0491',
        description: 'London',
        radius: 42,
        sliderLabel: '42km',
    },
    {
        locationId: 'ajdo-219a-j19v-0492',
        description: 'Berlin',
        radius: 20,
        sliderLabel: '20km',
    },
    {
        locationId: 'ajdo-219a-j19v-04925',
        description: 'Berlin',
        radius: 20,
        sliderLabel: '20km',
    },
    {
        locationId: 'ajdo-219a-j19v-0494',
        description: 'Berlin',
        radius: 20,
        sliderLabel: '20km',
    },
    {
        locationId: 'ajdo-219a-j19v-0492231',
        description: 'Berlin',
        radius: 20,
        sliderLabel: '20km',
    },
];

storiesOf('Organisms|LocationSelector', module).add('LocationSelector', () => (
    <LocationSelector
        apiKey="apiKey"
        selectedLocations={selectedLocations}
        country="NL"
        language="EN"
        radiusUnits="km"
        radiusUnitDisplayText="42"
        minRadius={1}
        maxRadius={100}
        radiusStep={1}
        autocompletePlaceholder="autocompletePlaceholder"
        noSuggestionsPlaceholder="noSuggestionsPlaceholder"
        selectionPlaceholder="selectionPlaceholder"
        mainPlaceholder="mainPlaceholder"
        doneLabel="Done"
        clearLabel="Clear"
        contentLabel="Location selector"
        onAddLocation={() => null}
        onUpdateLocation={() => null}
        onRemoveLocation={() => null}
        onRemoveAllLocations={() => null}
    />
));
