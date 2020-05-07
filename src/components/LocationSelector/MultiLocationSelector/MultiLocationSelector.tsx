import * as React from 'react';
import { LocationSelectorDialogWithGoogleLoader } from '../LocationSelectorDialogWithGoogleLoader';
import { Location, findCenter, getRadiusInMeters } from '../utils';

interface Props {
    /** Google api key */
    apiKey: string;
    /** language in which suggestions should be displayed */
    language: string;
    /**
     * Regional setting for the map. By default Google uses US.
     * For details see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region?: string;
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps?: object;
    /** stores an array of selected location objects */
    selectedLocations: Location[];
    /** defines if selector has an option to control the radius for a marker */
    hasRadius: boolean;
    /** default radius value */
    radiusDefaultValue?: number;
    /** radius measurement unit */
    radiusUnits: 'km' | 'mi';
    /** radius label renderer e.g. radius => `+ ${radius} km` */
    renderRadiusLabel: (string) => string;
    /** min radius value of the slider component */
    minRadius?: number;
    /** max radius value of the slider component */
    maxRadius?: number;
    /** radius step value of the slider component */
    radiusStep?: number;
    /** country where search can take place */
    country: string;
    /** address to make initial map centering more specific */
    initialMapAddress?: string;
    /**
     * type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes?: string[];
    /** show country name in autocomplete suggestions */
    showCountryInSuggestions?: boolean;
    /** placeholder for both main field and autocomplete field in modal */
    inputPlaceholder: string;
    /** placeholder for empty LocationAutocomplete list */
    noSuggestionsPlaceholder: string;
    /** function to be executed if error occurs while fetching suggestions */
    onLocationAutocompleteError?: () => void;
    /** label for the Done button */
    doneLabel: string;
    /** function called with location object as an argument when it is selected from the suggestions */
    onAddLocation: (Location) => void;
    /** function called with a location details as an argument to be changed */
    onUpdateLocation: (Location) => void;
    /** function with a locationId as an argument to be removed */
    onRemoveLocation: (Location) => void;
    /** callback function for closed modal */
    onCloseModal: () => void;
}

export const MultiLocationSelector: React.FC<Props> = (props) => {
    const {
        /** Google props */
        apiKey,
        language,
        region,
        additionalGoogleProps,

        /** FieldWrapper props */
        inputPlaceholder,

        /** LocationCard props */
        hasRadius,
        minRadius,
        maxRadius,
        radiusStep,
        renderRadiusLabel,
        onRemoveLocation,
        doneLabel,

        /** LocationAutocomplete props */
        country,
        initialMapAddress,
        placeTypes,
        noSuggestionsPlaceholder,
        showCountryInSuggestions,
        onLocationAutocompleteError,

        /** Internal use */
        onAddLocation,
        onUpdateLocation,
        onCloseModal,
        selectedLocations,
        radiusDefaultValue,
        radiusUnits,
    } = props;

    /**
     * Fetch additional information for the selected place and
     * add it along with passed location object to the selectedLocations array
     * if this location was not selected yet
     */
    function handleAddLocation(location) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { Geocoder } = (window as any).google.maps;
        const geocoder = new Geocoder();

        return findCenter(geocoder, location.place_id)
            .then((center: any) => {
                const locationToAdd = {
                    ...location,
                    center: {
                        lng: typeof center.lng === 'function' ? center.lng() : center.lng,
                        lat: typeof center.lat === 'function' ? center.lat() : center.lat,
                    },
                    radius: hasRadius ? radiusDefaultValue : 0,
                };

                const isLocationSelected = selectedLocations
                    .map((item) => item.id)
                    .includes(location.id);

                if (!isLocationSelected) {
                    onAddLocation(locationToAdd);
                }
            })
            .catch(/* TODO: add error handling */);
    }

    function getMarkers() {
        return selectedLocations.map((location) => ({
            description: location.description,
            center: location.center,
            radius: hasRadius ? getRadiusInMeters(location.radius, radiusUnits) : 0,
        }));
    }

    return (
        <LocationSelectorDialogWithGoogleLoader
            apiKey={apiKey}
            language={language}
            region={region}
            {...additionalGoogleProps}
            inputPlaceholder={inputPlaceholder}
            hasRadius={hasRadius}
            minRadius={minRadius}
            maxRadius={maxRadius}
            radiusStep={radiusStep}
            renderRadiusLabel={renderRadiusLabel}
            onRemoveLocation={onRemoveLocation}
            doneLabel={doneLabel}
            country={country}
            initialMapAddress={initialMapAddress}
            placeTypes={placeTypes}
            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
            showCountryInSuggestions={showCountryInSuggestions}
            onLocationAutocompleteError={onLocationAutocompleteError}
            onUpdateLocation={onUpdateLocation}
            selectedLocations={selectedLocations}
            getMarkers={getMarkers}
            onAddLocation={handleAddLocation}
            onCloseModal={onCloseModal}
        />
    );
};

MultiLocationSelector.displayName = 'MultiLocationSelector';

MultiLocationSelector.defaultProps = {
    radiusDefaultValue: 1,
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
    initialMapAddress: undefined,
    showCountryInSuggestions: true,
    additionalGoogleProps: {},
    region: undefined,
    selectedLocations: [],
    placeTypes: ['(regions)'],
    onLocationAutocompleteError: () => null,
};
