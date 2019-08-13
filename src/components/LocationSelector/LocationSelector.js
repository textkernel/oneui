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

const DEFAULT_LOCATION_CIRCLE_RADIUS = 1;

function LocationSelector(props) {
    const {
        minRadius,
        maxRadius,
        selectedLocations,
        addLocation,
        changeLocation,
        removeLocation,
        doneLabel,
    } = props;

    const [isOpen, setIsOpen] = React.useState(false);

    /**
     * Fetch additional information for the selected place and
     * add it along with passed location object to the selectedLocations array
     */
    function onAddLocation(location) {
        const placeInfo = fetchPlaceInfo(location.id);
        const locationToAdd = {
            ...location,
            center: placeInfo.coordinates,
            radius: DEFAULT_LOCATION_CIRCLE_RADIUS,
            structuredFormatting: placeInfo.structuredFormatting,
        };
        addLocation(locationToAdd);
    }

    return (
        <>
            <FieldWrapper />
            <Modal isOpen={isOpen}>
                <LoadScriptNext>
                    <LocationAutocomplete />
                    <Button context="brand">{doneLabel}</Button>
                    {selectedLocations.map(location => (
                        <LocationCard
                            locationId={location.id}
                            locationTitle={location.description}
                            sliderLabel={location.radius}
                            minRadius={minRadius}
                            maxRadius={maxRadius}
                            // lots of other props
                        />
                    ))}
                    <Map />
                </LoadScriptNext>
            </Modal>
        </>
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
    ),
    /** country where search can take place */
    country: PropTypes.string.isRequired,
    /** language in which suggestions should be displayed */
    language: PropTypes.string.isRequired,
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
    /** map center coordinates if nothing has been selected yet */
    mapCenter: PropTypes.shape({
        lng: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
    }).isRequired,
    /** map localize */
    mapRegion: PropTypes.string,
    /** map default zoom value */
    mapZoom: PropTypes.number.isRequired,
    /** placeholder for LocationAutocomplete field */
    autocompletePlaceholder: PropTypes.string.isRequired,
    /** placeholder for empty LocationAutocomplete list */
    noSuggestionsPlaceholder: PropTypes.string.isRequired,
    /** string to be displayed in FieldWrapper when the modal is closed, but locations are selected */
    selectionPlaceholder: PropTypes.string.isRequired,
    /** placeholder for FieldWrapper when there's no locations selected */
    mainPlaceholder: PropTypes.string.isRequired,
    /** label for the Done button */
    doneLabel: PropTypes.string.isRequired,
    /** show country name in autocomplete suggestions */
    showCountryInSuggestions: PropTypes.bool,
    /** label to be used on the clear all button */
    removeAllLabel: PropTypes.string.isRequired,
    /** function with a location object as an argument to be added to the selectedLocations array */
    addLocation: PropTypes.func.isRequired,
    /** function with a location details as an argument to be changed */
    changeLocation: PropTypes.func.isRequired,
    /** function with a locationId as an argument to be removed */
    removeLocation: PropTypes.func.isRequired,
    /** callback function for the Clear button click */
    removeAllLocations: PropTypes.func.isRequired,
    /** callback function for closed modal */
    onBlur: PropTypes.func,
};

LocationSelector.defaultProps = {
    selectedLocations: [],
    showCountryInSuggestions: true,
    onBlur: () => null,
};

export default LocationSelector;
