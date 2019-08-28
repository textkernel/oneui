import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem';
import { LoadScriptNext } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
    Text,
    Modal,
    Map,
    FieldWrapper,
    Button,
    LocationCard,
    LoadingSpinner,
    LocationAutocomplete,
} from '../../index';
import styles from './LocationSelector.scss';

const GOOGLE_API_LIBRARIES = ['places'];

const { block, elem } = bem({
    name: 'LocationSelector',
    classnames: styles,
});

function LocationSelector(props) {
    const {
        /** Google props */
        apiKey,
        language,
        region,
        additionalGoogleProps,

        /** FieldWrapper props */
        clearLabel,
        onRemoveAllLocations,

        /** LocationCard props */
        minRadius,
        maxRadius,
        renderRadiusLabel,
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

        ...rest
    } = props;

    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenModal = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };

    const handleCloseModal = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    };

    /**
     * Fetch additional information for the selected place and
     * add it along with passed location object to the selectedLocations array
     */
    const handleAddLocation = location => {
        // const placeInfo = fetchPlaceInfo(location.id);
        const locationToAdd = {
            ...location,
            // center: placeInfo.coordinates,
            radius: radiusDefaultValue,
            // structuredFormatting: placeInfo.structuredFormatting,
        };
        onAddLocation(locationToAdd);
    };

    return (
        <div {...block(props)}>
            <FieldWrapper
                onClick={handleOpenModal}
                clearLabel={clearLabel}
                onClear={onRemoveAllLocations}
                {...rest}
            >
                <FaMapMarkerAlt {...elem('icon', props)} />
                <Text placeholder="Some placeholder" {...elem('mainTextInput', props)}>
                    Some placeholder
                </Text>
            </FieldWrapper>
            <Modal {...elem('modal', props)} isOpen={isOpen} onRequestClose={handleCloseModal}>
                <LoadScriptNext
                    googleMapsApiKey={apiKey}
                    language={language}
                    region={region}
                    loadingElement={<LoadingSpinner centerIn="parent" />}
                    libraries={GOOGLE_API_LIBRARIES}
                    {...additionalGoogleProps}
                >
                    <div {...elem('inputLine', props)}>
                        <LocationAutocomplete
                            {...elem('searchField', props)}
                            inputPlaceholder={autocompletePlaceholder}
                            noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                            onSelectionChange={handleAddLocation}
                            country={country}
                            placeTypes={placeTypes}
                            showCountryInSuggestions={showCountryInSuggestions}
                            onError={onLocationAutocompleteError}
                            hidePoweredByGoogleLogo
                        />
                        <Button
                            {...elem('button', props)}
                            onClick={handleCloseModal}
                            context="brand"
                        >
                            {doneLabel}
                        </Button>
                    </div>
                    <div {...elem('locationsWrapper', props)}>
                        <ul {...elem('locationCardsContainer', props)}>
                            {selectedLocations.map(location => (
                                <LocationCard
                                    {...elem('locationCard', props)}
                                    As="li"
                                    locationId={location.id}
                                    locationTitle={location.description}
                                    distanceRadius={location.radius}
                                    sliderLabel={renderRadiusLabel(location.radius)}
                                    minRadius={minRadius}
                                    maxRadius={maxRadius}
                                    onRadiusChange={radius => onUpdateLocation(location.id, radius)}
                                    onDelete={() => onRemoveLocation(location.id)}
                                />
                            ))}
                        </ul>
                        <Map />
                    </div>
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
            center: PropTypes.shape({
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
    /** radius label renderer e.g. radius => `+ ${radius} km` */
    renderRadiusLabel: PropTypes.func.isRequired,
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
    // placeTypes: LocationAutocomplete.propTypes.placeTypes,
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
    // placeTypes: LocationAutocomplete.propTypes.placeTypes,
    radiusDefaultValue: 1,
    showCountryInSuggestions: true,
    onBlur: () => null,
};

export default LocationSelector;
