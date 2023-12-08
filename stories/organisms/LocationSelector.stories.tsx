import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LocationSelector, LocationSelectorProps } from '@textkernel/oneui';
import { ensureApiKey } from '../utils/ensureApiKey';
import NL_PATHS from '../static/gadm36_NLD_0.json';

const mockSelectedLocations = [
    {
        id: 'ajdo-219a-j19v-0491',
        place_id: 'ajdo-219a-j19v-0491',
        description: 'Amsterdam',
        center: {
            lng: 4.894539799999961,
            lat: 52.3666969,
        },
        radius: 42,
    },
    {
        id: 'ajdo-219a-j19v-0492',
        place_id: 'ajdo-219a-j19v-0492',
        description: 'Utrecht',
        center: {
            lng: 5.121420100000023,
            lat: 52.09073739999999,
        },
        radius: 20,
    },
];

const meta: Meta<typeof LocationSelector> = {
    title: 'Organisms/LocationSelector',
    component: LocationSelector,
    argTypes: {
        defaultHighlight: {
            options: ['true', 'false'],
            mapping: {
                true: NL_PATHS as GeoJSON.GeoJsonObject,
                false: undefined,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof LocationSelector>;

export const Basic: Story = {
    name: 'Basic',
    args: {
        className: 'test-class',
        selectedLocations: mockSelectedLocations,
        country: 'NL',
        language: 'EN',
        region: 'NL',
        initialMapAddress: '',
        radiusUnits: 'km',
        renderRadiusLabel: (r) => `+ ${r} km`,
        hasRadius: true,
        minRadius: 1,
        maxRadius: 100,
        radiusStep: 1,
        modalContentLabel: 'Location selection',
        inputPlaceholder: 'Location...',
        modalInputPlaceholder: '',
        noSuggestionsPlaceholder: 'noSuggestionsPlaceholder',
        selectionPlaceholder: 'selectionPlaceholder',
        doneLabel: 'Done',
        clearTooltipLabel: 'Clear',
    },
    render: (args) => {
        const apiKey = ensureApiKey();

        return <LocationSelector {...(args as LocationSelectorProps)} apiKey={apiKey || ''} />;
    },
};

const Template = (args: LocationSelectorProps) => {
    const apiKey = ensureApiKey();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedLocations, setSelectedLocations] = React.useState<any[]>([]);

    const handleAddLocation = (location) => {
        console.log('onAddLocation was called with:', location);
        setSelectedLocations([location]);
    };

    const handleUpdateLocation = (id, radius) => {
        console.log('onUpdateLocation was called', id, radius);
        const newSelection = selectedLocations.map((loc) => {
            if (loc.id === id) {
                loc.radius = radius; // eslint-disable-line no-param-reassign
            }
            return loc;
        });
        setSelectedLocations(newSelection);
    };

    const handleRemoveLocation = (id) => {
        console.log('onRemoveLocation was called', id);
        setSelectedLocations(selectedLocations.filter((l) => l.id !== id));
    };

    const handleRemoveAllLocations = () => {
        console.log('onRemoveAllLocations was called');
        setSelectedLocations([]);
    };

    const getPlaceholder = () => {
        const selectedLocationsText = selectedLocations
            .map((item) => item.structured_formatting.main_text)
            .join(', ');
        return selectedLocationsText || undefined;
    };

    return (
        <LocationSelector
            {...args}
            apiKey={apiKey || ''}
            selectedLocations={selectedLocations}
            selectionPlaceholder={getPlaceholder()}
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
        />
    );
};

export const SingleSelect: Story = {
    name: 'SingleSelect',
    args: {
        withoutLocationCards: true,
        region: 'NL',
        country: 'NL',
        language: 'EN',
        initialMapAddress: 'Netherlands',
        radiusUnits: 'km',
        renderRadiusLabel: (r) => `+ ${r} km`,
        hasRadius: true,
        minRadius: 1,
        maxRadius: 100,
        radiusDefaultValue: 5,
        radiusStep: 1,
        placeTypes: ['(regions)'],
        openOnEnterPress: true,
        shouldGetAddressInfo: false,
        showCountryInSuggestions: true,
        modalContentLabel: 'Location selection',
        inputPlaceholder: 'Location...',
        modalInputPlaceholder: '',
        noSuggestionsPlaceholder: 'noSuggestionsPlaceholder',
        doneLabel: 'Done',
        clearTooltipLabel: 'Clear',
    },
    render: Template,
};

export const MultiSelect: Story = {
    name: 'MultiSelect',
    args: {
        region: 'NL',
        country: 'NL',
        language: 'EN',
        initialMapAddress: 'Netherlands',
        radiusUnits: 'km',
        renderRadiusLabel: (r) => `+ ${r} km`,
        hasRadius: true,
        minRadius: 1,
        maxRadius: 100,
        radiusDefaultValue: 5,
        radiusStep: 1,
        placeTypes: ['(regions)'],
        openOnEnterPress: true,
        shouldGetAddressInfo: false,
        showCountryInSuggestions: true,
        modalContentLabel: 'Location selection',
        inputPlaceholder: 'Location...',
        modalInputPlaceholder: '',
        noSuggestionsPlaceholder: 'noSuggestionsPlaceholder',
        doneLabel: 'Done',
        clearTooltipLabel: 'Clear',
    },
    render: Template,
};
