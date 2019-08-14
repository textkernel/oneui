import React from 'react';
import PropTypes from 'prop-types';
import { LoadScriptNext } from '@react-google-maps/api';
import {
    Modal,
    Map,
    FieldWrapper,
    LocationAutocomplete,
    Button,
    LocationCard,
} from '@textkernel/oneui';
import styles from './LocationSelector.scss';

const { block, elem } = bem({
    name: 'LocationCard',
    classnames: styles,
});

function LocationSelector(props) {
    const {
        /** FieldWrapper props */
        clearLabel,
        onRemoveAllLocations,

        /** LocationCard props */
        minRadius,
        maxRadius,
        radiusDefaultValue,
        selectedLocations,
        onAddLocation,
        onUpdateLocation,
        onRemoveLocation,
        doneLabel,

        /** LocationAutocomplete props */
        country,
        placeTypes,
        autocompletePlaceholder,
        noSuggestionsPlaceholder,
        showCountryInSuggestions,
        onLocationAutocompleteError,
    } = props;

    const [isOpen, setIsOpen] = React.useState(false);

    /**
     * Fetch additional information for the selected place and
     * add it along with passed location object to the selectedLocations array
     */
    function handleAddLocation(location) {
        const placeInfo = fetchPlaceInfo(location.id);
        const locationToAdd = {
            ...location,
            center: placeInfo.coordinates,
            radius: radiusDefaultValue,
            structuredFormatting: placeInfo.structuredFormatting,
        };
        onAddLocation(locationToAdd);
    }

    return (
        <div {...block(props)}>
            <FieldWrapper clearLabel={clearLabel} onClear={onRemoveAllLocations} />
            <Modal isOpen={isOpen}>
                <LoadScriptNext>
                    <LocationAutocomplete
                        inputPlaceholder={autocompletePlaceholder}
                        noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                        onSelectionChange={handleAddLocation}
                        country={country}
                        placeTypes={placeTypes}
                        showCountryInSuggestions={showCountryInSuggestions}
                        onError={onLocationAutocompleteError}
                    />
                    <Button context="brand">{doneLabel}</Button>
                    {selectedLocations.map(location => (
                        <LocationCard
                            locationId={location.id}
                            locationTitle={location.description}
                            sliderLabel={location.radius}
                            minRadius={minRadius}
                            maxRadius={maxRadius}
                            onRadiusChange={onUpdateLocation}
                            onDelete={onRemoveLocation}
                        />
                    ))}
                    <Map />
                </LoadScriptNext>
            </Modal>
        </div>
    );
}

LocationSelector.displayName = 'LocationSelector';

LocationSelector.propTypes = {
    /** Google api key */
    apiKey: PropTypes.string.isRequired,
    /** stores an array of selected location objects */
    selectedLocations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            structuredFormatting: PropTypes.string.isRequired,
            center: PropTypes.shapeOf({
                lng: PropTypes.number.isRequired,
                lan: PropTypes.number.isRequired,
            }).isRequired,
            radius: PropTypes.number.isRequired,
        })
    ).isRequired,
    /** country where search can take place */
    country: PropTypes.string.isRequired,
    /** language in which suggestions should be displayed */
    language: PropTypes.string.isRequired,
    /** default radius value */
    radiusDefaultValue: PropTypes.number,
    /** radius measurement unit */
    radiusUnits: PropTypes.oneOf(['km', 'mi']).isRequired,
    /** radius label suffix (e.g. km, miles or other language) */
    radiusUnitDisplayText: PropTypes.string.isRequired,
    /** min radius value of the slider component */
    minRadius: PropTypes.number.isRequired,
    /** max radius value of the slider component */
    maxRadius: PropTypes.number.isRequired,
    /** radius step value of the slider component */
    radiusStep: PropTypes.number.isRequired,
    /** map center coordinates if there's no selected locations */
    mapCenter: PropTypes.shape({
        lng: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
    }),
    /** map localize */
    mapRegion: PropTypes.string,
    /** map default zoom value */
    mapZoom: PropTypes.number,
    /** placeholder for LocationAutocomplete field */
    autocompletePlaceholder: PropTypes.string.isRequired,
    /** placeholder for empty LocationAutocomplete list */
    noSuggestionsPlaceholder: PropTypes.string.isRequired,
    /**
     * type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes: LocationAutocomplete.propTypes.placeTypes,
    /** function to be executed if error occurs while fetching suggestions */
    onLocationAutocompleteError: PropTypes.func,
    /** string to be displayed in FieldWrapper when the modal is closed, but locations are selected */
    selectionPlaceholder: PropTypes.string.isRequired,
    /** placeholder for FieldWrapper when there's no locations selected */
    mainPlaceholder: PropTypes.string.isRequired,
    /** label for the Done button */
    doneLabel: PropTypes.string.isRequired,
    /** show country name in autocomplete suggestions */
    showCountryInSuggestions: PropTypes.bool,
    /** label to be used on the clear all button */
    clearLabel: PropTypes.string.isRequired,
    /** function with a location object as an argument to be added to the selectedLocations array */
    onAddLocation: PropTypes.func.isRequired,
    /** function with a location details as an argument to be changed */
    onUpdateLocation: PropTypes.func.isRequired,
    /** function with a locationId as an argument to be removed */
    onRemoveLocation: PropTypes.func.isRequired,
    /** callback function for the Clear button click */
    onRemoveAllLocations: PropTypes.func.isRequired,
    /** callback function for closed modal */
    onBlur: PropTypes.func,
};

LocationSelector.defaultProps = {
    radiusDefaultValue: 1,
    showCountryInSuggestions: true,
    onBlur: () => null,
};

export default LocationSelector;
