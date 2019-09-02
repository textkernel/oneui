import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, select, boolean, withKnobs } from '@storybook/addon-knobs';
import LocationSelector from '../src/components/LocationSelector';
import ensureApiKey from './utils/ensureApiKey';
import withStore from '../src/packages/storybook/withStore';

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

storiesOf('Organisms|LocationSelector', module)
    .addDecorator(withKnobs)
    .addParameters(
        withStore({
            selectedLocations: [],
        })
    )
    .add('Basic component', () => {
        const apiKey = ensureApiKey();

        return (
            <LocationSelector
                apiKey={apiKey}
                selectedLocations={selectedLocations}
                country={text('country', 'NL')}
                language={text('Language', 'EN')}
                radiusUnits="km"
                renderRadiusLabel={r => `+ ${r} km`}
                minRadius={number('Min radius', 1)}
                maxRadius={number('Max radius', 100)}
                radiusStep={number('Radius steps', 1)}
                autocompletePlaceholder="autocompletePlaceholder"
                noSuggestionsPlaceholder="noSuggestionsPlaceholder"
                selectionPlaceholder="selectionPlaceholder"
                mainPlaceholder="mainPlaceholder"
                doneLabel={text('Label for Done button', 'Done')}
                clearLabel={text('Label for clear button', 'Clear')}
                contentLabel={text('Placeholder for input field', 'Location selector')}
                onAddLocation={location => console.log('onAddLocation was called with:', location)}
                onUpdateLocation={() => console.log('onUpdateLocation was called')}
                onRemoveLocation={() => console.log('onRemoveLocation was called')}
                onRemoveAllLocations={() => console.log('onRemoveAllLocations was called')}
            />
        );
    })
    .add('Example implementation', ({ parameters }) => {
        const apiKey = ensureApiKey();
        const store = parameters.getStore();

        const handleAddLocation = location => {
            console.log('onAddLocation was called with:', location);
            store.set({ selectedLocations: [...store.get('selectedLocations'), location] });
        };

        const handleUpdateLocation = (id, radius) => {
            console.log('onUpdateLocation was called', id, radius);
            const newSelection = store.get('selectedLocations').map(loc => {
                if (loc.id === id) {
                    loc.radius = radius; // eslint-disable-line no-param-reassign
                }
                return loc;
            });
            store.set({ selectedLocations: newSelection });
        };

        const handleRemoveLocation = id => {
            console.log('onRemoveLocation was called', id);
            store.set({
                selectedLocations: store.get('selectedLocations').filter(l => l.id !== id),
            });
        };

        const handleRemoveAllLocations = () => {
            console.log('onRemoveAllLocations was called');
            store.set({ selectedLocations: [] });
        };

        const getPlaceholder = () => {
            const selection = store.get('selectedLocations');
            return selection.length ? selection[0].structured_formatting.main_text : null;
        };

        return (
            <LocationSelector
                apiKey={apiKey}
                selectedLocations={store.get('selectedLocations')}
                country={text('country', 'NL')}
                language={text('Language', 'EN')}
                radiusUnits={select('Radius units', ['km', 'mi'], 'km')}
                renderRadiusLabel={r => `+ ${r} km`}
                minRadius={number('Min radius', 1)}
                maxRadius={number('Max radius', 100)}
                radiusDefaultValue={number('Radius default value', 5)}
                radiusStep={number('Radius steps', 1)}
                placeTypes="city"
                showCountryInSuggestions={boolean('Show country in suggestions', true)}
                modalContentLabel={text(
                    'Modal content title for screen readers',
                    'Location selection'
                )}
                inputPlaceholder={text('Input placeholder', 'Location...')}
                noSuggestionsPlaceholder="noSuggestionsPlaceholder"
                selectionPlaceholder={getPlaceholder()}
                doneLabel={text('Label for Done button', 'Done')}
                clearLabel={text('Label for clear button', 'Clear')}
                onAddLocation={handleAddLocation}
                onUpdateLocation={handleUpdateLocation}
                onRemoveLocation={handleRemoveLocation}
                onRemoveAllLocations={handleRemoveAllLocations}
                onBlur={() => {
                    console.log('onBlur was called');
                }}
            />
        );
    });
