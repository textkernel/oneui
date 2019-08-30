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
import { findCenter, getRadiusInMeters } from './utils';
import styles from './LocationSelector.scss';

const GOOGLE_API_LIBRARIES = ['places'];

const { block, elem } = bem({
    name: 'LocationSelector',
    classnames: styles,
    propsToMods: ['muted'],
});

const LocationSelector = props => {
    const {
        /** Google props */
        apiKey,
        language,
        region,
        additionalGoogleProps,

        /** FieldWrapper props */
        clearLabel,
        onRemoveAllLocations,
        inputPlaceholder,
        selectionPlaceholder,

        /** LocationCard props */
        minRadius,
        maxRadius,
        radiusStep,
        renderRadiusLabel,
        onRemoveLocation,
        doneLabel,

        /** LocationAutocomplete props */
        country,
        placeTypes,
        noSuggestionsPlaceholder,
        showCountryInSuggestions,
        onLocationAutocompleteError,

        /** Internal use */
        onAddLocation,
        onUpdateLocation,
        onBlur,
        selectedLocations,
        radiusDefaultValue,
        radiusUnits,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = React.useState(false);

    const handleOpenModal = () => {
        if (!isOpen) {
            setIsOpen(true);
            // TODO: set focus on LocationAutocomplete
        }
    };

    const handleCloseModal = () => {
        if (isOpen) {
            setIsOpen(false);
            onBlur();
        }
    };

    /**
     * Fetch additional information for the selected place and
     * add it along with passed location object to the selectedLocations array
     */
    const handleAddLocation = location => {
        const { Geocoder } = window.google.maps;
        const geocoder = new Geocoder();

        findCenter(geocoder, location.place_id)
            .then(center => {
                const locationToAdd = {
                    ...location,
                    center,
                    radius: radiusDefaultValue,
                };
                onAddLocation(locationToAdd);
            })
            .catch(/* TODO: add error handling */);
    };

    const getMarkers = () => {
        return selectedLocations.map(location => ({
            center: location.center,
            radius: getRadiusInMeters(location.radius, radiusUnits),
        }));
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
                <Text {...elem('mainTextInput', { ...props, muted: !selectionPlaceholder })}>
                    {selectionPlaceholder || inputPlaceholder}
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
                            inputPlaceholder={inputPlaceholder}
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
                        {!!selectedLocations.length && (
                            <ul {...elem('locationCardsContainer', props)}>
                                {selectedLocations.map(location => (
                                    <LocationCard
                                        key={location.id}
                                        {...elem('locationCard', props)}
                                        As="li"
                                        locationId={location.id}
                                        locationTitle={location.description}
                                        distanceRadius={location.radius}
                                        sliderLabel={renderRadiusLabel(location.radius)}
                                        minRadius={minRadius}
                                        maxRadius={maxRadius}
                                        radiusStep={radiusStep}
                                        onRadiusChange={radius =>
                                            onUpdateLocation(location.id, radius)
                                        }
                                        onDelete={() => onRemoveLocation(location.id)}
                                    />
                                ))}
                            </ul>
                        )}
                        <Map defaultArea={{ address: country }} markers={getMarkers()} />
                    </div>
                </LoadScriptNext>
            </Modal>
        </div>
    );
};

LocationSelector.displayName = 'LocationSelector';

LocationSelector.propTypes = {
    /** Google api key */
    apiKey: PropTypes.string.isRequired,
    /** language in which suggestions should be displayed */
    language: PropTypes.string.isRequired,
    /** Regional setting for the map. By default Google uses US.
     * For details see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region: PropTypes.string,
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    /** stores an array of selected location objects */
    selectedLocations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            center: PropTypes.shape({
                lng: PropTypes.number.isRequired,
                lan: PropTypes.number.isRequired,
            }).isRequired,
            radius: PropTypes.number.isRequired,
        })
    ).isRequired,
    /** default radius value */
    radiusDefaultValue: PropTypes.number,
    /** radius measurement unit */
    radiusUnits: PropTypes.oneOf(['km', 'mi']).isRequired,
    /** radius label renderer e.g. radius => `+ ${radius} km` */
    renderRadiusLabel: PropTypes.func.isRequired,
    /** min radius value of the slider component */
    minRadius: PropTypes.number,
    /** max radius value of the slider component */
    maxRadius: PropTypes.number,
    /** radius step value of the slider component */
    radiusStep: PropTypes.number,
    /** country where search can take place */
    country: PropTypes.string.isRequired,
    /**
     * type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes: PropTypes.arrayOf(PropTypes.string),
    /** show country name in autocomplete suggestions */
    showCountryInSuggestions: PropTypes.bool,
    /** placeholder for both main field and autocomplete field in modal */
    inputPlaceholder: PropTypes.string.isRequired,
    /** placeholder for empty LocationAutocomplete list */
    noSuggestionsPlaceholder: PropTypes.string.isRequired,
    /** function to be executed if error occurs while fetching suggestions */
    onLocationAutocompleteError: PropTypes.func,
    /** string to be displayed in FieldWrapper when the modal is closed, but locations are selected */
    selectionPlaceholder: PropTypes.string,
    /** label for the Done button */
    doneLabel: PropTypes.string.isRequired,
    /** label to be used on the clear all button */
    clearLabel: PropTypes.string.isRequired,
    /** function called with location object as an argument when it is selected from the suggestions */
    onAddLocation: PropTypes.func.isRequired,
    /** function called with a location details as an argument to be changed */
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
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
    showCountryInSuggestions: true,
    onBlur: () => null,
    additionalGoogleProps: {},
    region: undefined,
    selectionPlaceholder: null,
    placeTypes: LocationAutocomplete.defaultProps.placeTypes,
    onLocationAutocompleteError: LocationAutocomplete.defaultProps.onError,
};

export default LocationSelector;
