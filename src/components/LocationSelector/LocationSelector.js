import * as React from 'react';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { bem } from '../../utils';
import { Text } from '../Text';
import { Modal } from '../Modal';
import { FieldWrapper } from '../FieldWrapper';
import { LocationSelectorDialogWithGoogleLoader } from './LocationSelectorDialogWithGoogleLoader';
import { findCenter, getRadiusInMeters } from './utils';
import styles from './LocationSelector.scss';

const { block, elem } = bem('LocationSelector', styles);

export function LocationSelector(props) {
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

        /** Modal props */
        modalContentLabel,

        /** LocationCard props */
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
        onBlur,
        selectedLocations,
        radiusDefaultValue,
        radiusUnits,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = React.useState(false);

    const hasLocationsSelected = selectedLocations && selectedLocations.length > 0;

    function handleOpenModal() {
        if (!isOpen) {
            setIsOpen(true);
        }
    }

    function handleCloseModal() {
        if (isOpen) {
            setIsOpen(false);
            onBlur();
        }
    }

    /**
     * Fetch additional information for the selected place and
     * add it along with passed location object to the selectedLocations array
     * if this location was not selected yet
     */
    function handleAddLocation(location) {
        const { Geocoder } = window.google.maps;
        const geocoder = new Geocoder();

        return findCenter(geocoder, location.place_id)
            .then((center) => {
                const locationToAdd = {
                    ...location,
                    center: {
                        lng: typeof center.lng === 'function' ? center.lng() : center.lng,
                        lat: typeof center.lat === 'function' ? center.lat() : center.lat,
                    },
                    radius: radiusDefaultValue,
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
            center: location.center,
            radius: getRadiusInMeters(location.radius, radiusUnits),
        }));
    }

    return (
        <div {...rest} {...block(props)}>
            <FieldWrapper
                {...elem('mainTextInputWrapper', props)}
                showClearButton={hasLocationsSelected}
                clearLabel={clearLabel}
                onClick={handleOpenModal}
                onClear={onRemoveAllLocations}
            >
                <FaMapMarkerAlt {...elem('icon', props)} />
                <Text {...elem('mainTextInput', { ...props, muted: !selectionPlaceholder })}>
                    {selectionPlaceholder || inputPlaceholder}
                </Text>
            </FieldWrapper>
            <Modal
                {...elem('modal', props)}
                isOpen={isOpen}
                ariaHideApp={false}
                onRequestClose={handleCloseModal}
                contentLabel={modalContentLabel}
            >
                <LocationSelectorDialogWithGoogleLoader
                    apiKey={apiKey}
                    language={language}
                    region={region}
                    {...additionalGoogleProps}
                    inputPlaceholder={inputPlaceholder}
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
                    onCloseModal={handleCloseModal}
                />
            </Modal>
        </div>
    );
}

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
                lat: PropTypes.number.isRequired,
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
    /** address to make initial map centering more specific */
    initialMapAddress: PropTypes.string,
    /**
     * type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes: PropTypes.arrayOf(PropTypes.string),
    /** show country name in autocomplete suggestions */
    showCountryInSuggestions: PropTypes.bool,
    /** A title for the modal that will be used by screenreaders */
    modalContentLabel: PropTypes.string.isRequired,
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
    initialMapAddress: undefined,
    showCountryInSuggestions: true,
    onBlur: () => null,
    additionalGoogleProps: {},
    region: undefined,
    selectionPlaceholder: null,
    placeTypes: ['(regions)'],
    onLocationAutocompleteError: () => null,
};
