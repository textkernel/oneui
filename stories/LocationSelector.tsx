import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, select, boolean, withKnobs } from '@storybook/addon-knobs';
import { LocationSelector } from '@textkernel/oneui';
import { ensureApiKey } from './utils/ensureApiKey';
import { StoreInjector } from '../src/packages/storybook/withStore';
import NL_PATHS from './static/gadm36_NLD_0.json';

const selectedLocations = [
    {
        id: 'ajdo-219a-j19v-0491',
        description: 'Amsterdam',
        center: {
            lng: 4.894539799999961,
            lat: 52.3666969,
        },
        radius: 42,
    },
    {
        id: 'ajdo-219a-j19v-0492',
        description: 'Utrecht',
        center: {
            lng: 5.121420100000023,
            lat: 52.09073739999999,
        },
        radius: 20,
    },
];

storiesOf('Organisms|LocationSelector', module)
    .addDecorator(withKnobs)
    .addParameters(
        StoreInjector.withStore({
            selectedLocations: [],
            radiusUnits: 'km',
            withoutLocationCards: false,
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
                region={text('Region', 'NL')}
                initialMapAddress={text('Initial map address', '')}
                radiusUnits="km"
                renderRadiusLabel={(r) => `+ ${r} km`}
                hasRadius={boolean('Use radius search', true)}
                minRadius={number('Min radius', 1)}
                maxRadius={number('Max radius', 100)}
                radiusStep={number('Radius steps', 1)}
                modalContentLabel={text(
                    'Modal content title for screen readers',
                    'Location selection'
                )}
                inputPlaceholder={text('Input placeholder', 'Location...')}
                modalInputPlaceholder={text('Input placeholder inside the modal', '')}
                noSuggestionsPlaceholder="noSuggestionsPlaceholder"
                selectionPlaceholder="selectionPlaceholder"
                doneLabel={text('Label for Done button', 'Done')}
                clearLabel={text('Label for clear button', 'Clear')}
                onAddLocation={(location) =>
                    console.log('onAddLocation was called with:', location)
                }
                onUpdateLocation={() => console.log('onUpdateLocation was called')}
                onRemoveLocation={() => console.log('onRemoveLocation was called')}
                onRemoveAllLocations={() => console.log('onRemoveAllLocations was called')}
                onLocationAutocompleteError={() =>
                    console.log('onLocationAutocompleteError was called')
                }
                defaultHighlight={
                    boolean('Add default highlight area', true)
                        ? (NL_PATHS as GeoJSON.GeoJsonObject)
                        : undefined
                }
            />
        );
    })
    // eslint-disable-next-line
    .add('Example single select implementation', ({ parameters }: any) => {
        const apiKey = ensureApiKey();
        const store = parameters.getStore();

        const handleAddLocation = (location) => {
            console.log('onAddLocation was called with:', location);
            store.set({ selectedLocations: [location] });
        };

        const handleUpdateLocation = (id, radius) => {
            console.log('onUpdateLocation was called', id, radius);
            const newSelection = store.get('selectedLocations').map((loc) => {
                if (loc.id === id) {
                    loc.radius = radius; // eslint-disable-line no-param-reassign
                }
                return loc;
            });
            store.set({ selectedLocations: newSelection });
        };

        const handleRemoveLocation = (id) => {
            console.log('onRemoveLocation was called', id);
            store.set({
                selectedLocations: store.get('selectedLocations').filter((l) => l.id !== id),
            });
        };

        const handleRemoveAllLocations = () => {
            console.log('onRemoveAllLocations was called');
            store.set({ selectedLocations: [] });
        };

        const getPlaceholder = () => {
            const selection = store.get('selectedLocations');
            const selectedLocationsText = selection
                .map((item) => item.structured_formatting.main_text)
                .join(', ');
            return selectedLocationsText || null;
        };

        return (
            <LocationSelector
                apiKey={apiKey}
                withoutLocationCards
                selectedLocations={store.get('selectedLocations')}
                region={text('Region', 'NL')}
                country={text('country', 'NL')}
                language={text('Language', 'EN')}
                initialMapAddress={text('Initial map address', 'Netherlands')}
                radiusUnits={select('Radius units', ['km', 'mi'], 'km')}
                renderRadiusLabel={(r) => `+ ${r} km`}
                hasRadius={boolean('Has radius', true)}
                minRadius={number('Min radius', 1)}
                maxRadius={number('Max radius', 100)}
                radiusDefaultValue={number('Radius default value', 5)}
                radiusStep={number('Radius steps', 1)}
                placeTypes={['(regions)']}
                openOnEnterPress={boolean('Open on Enter press', true)}
                shouldGetAddressInfo={boolean('Fetch address information', false)}
                showCountryInSuggestions={boolean('Show country in suggestions', true)}
                modalContentLabel={text(
                    'Modal content title for screen readers',
                    'Location selection'
                )}
                inputPlaceholder={text('Input placeholder', 'Location...')}
                modalInputPlaceholder={text('Input placeholder inside the modal', '')}
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
                onLocationAutocompleteError={() =>
                    console.log('onLocationAutocompleteError was called')
                }
                defaultHighlight={
                    boolean('Add default highlight area', true)
                        ? (NL_PATHS as GeoJSON.GeoJsonObject)
                        : undefined
                }
            />
        );
    })
    // eslint-disable-next-line
    .add('Example multi select implementation', ({ parameters }: any) => {
        const apiKey = ensureApiKey();
        const store = parameters.getStore();

        const handleAddLocation = (location) => {
            console.log('onAddLocation was called with:', location);
            store.set({ selectedLocations: [...store.get('selectedLocations'), location] });
        };

        const handleUpdateLocation = (id, radius) => {
            console.log('onUpdateLocation was called', id, radius);
            const newSelection = store.get('selectedLocations').map((loc) => {
                if (loc.id === id) {
                    loc.radius = radius; // eslint-disable-line no-param-reassign
                }
                return loc;
            });
            store.set({ selectedLocations: newSelection });
        };

        const handleRemoveLocation = (id) => {
            console.log('onRemoveLocation was called', id);
            store.set({
                selectedLocations: store.get('selectedLocations').filter((l) => l.id !== id),
            });
        };

        const handleRemoveAllLocations = () => {
            console.log('onRemoveAllLocations was called');
            store.set({ selectedLocations: [] });
        };

        const getPlaceholder = () => {
            const selection = store.get('selectedLocations');
            const selectedLocationsText = selection
                .map((item) => item.structured_formatting.main_text)
                .join(', ');
            return selectedLocationsText || null;
        };

        return (
            <LocationSelector
                apiKey={apiKey}
                selectedLocations={store.get('selectedLocations')}
                region={text('Region', 'NL')}
                country={text('country', 'NL')}
                language={text('Language', 'EN')}
                initialMapAddress={text('Initial map address', 'Netherlands')}
                radiusUnits={select('Radius units', ['km', 'mi'], 'km')}
                renderRadiusLabel={(r) => `+ ${r} km`}
                hasRadius={boolean('Use radius search', true)}
                minRadius={number('Min radius', 1)}
                maxRadius={number('Max radius', 100)}
                radiusDefaultValue={number('Radius default value', 5)}
                radiusStep={number('Radius steps', 1)}
                placeTypes={['(regions)']}
                openOnEnterPress={boolean('Open on Enter press', true)}
                shouldGetAddressInfo={boolean('Fetch address information', false)}
                showCountryInSuggestions={boolean('Show country in suggestions', true)}
                modalContentLabel={text(
                    'Modal content title for screen readers',
                    'Location selection'
                )}
                inputPlaceholder={text('Input placeholder', 'Location...')}
                modalInputPlaceholder={text('Input placeholder inside the modal', '')}
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
                onLocationAutocompleteError={() =>
                    console.log('onLocationAutocompleteError was called')
                }
                defaultHighlight={
                    boolean('Add default highlight area', true)
                        ? (NL_PATHS as GeoJSON.GeoJsonObject)
                        : undefined
                }
            />
        );
    });
