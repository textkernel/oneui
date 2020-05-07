import * as React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { bem } from '../../utils';
import { Text } from '../Text';
import { Modal } from '../Modal';
import { FieldWrapper } from '../FieldWrapper';
import { MultiLocationSelector } from './MultiLocationSelector';
import { Location } from './utils';
import styles from './LocationSelector.scss';

const { block, elem } = bem('LocationSelector', styles);

interface Props {
    /** Google api key */
    apiKey: string;
    /** language in which suggestions should be displayed */
    language: string;
    /** Regional setting for the map. By default Google uses US.
     * For details see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region?: string;
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps?: object; // eslint-disable-line react/forbid-prop-types
    /** */
    singleLocation?: boolean;
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
    /** A title for the modal that will be used by screenreaders */
    modalContentLabel: string;
    /** placeholder for both main field and autocomplete field in modal */
    inputPlaceholder: string;
    /** placeholder for empty LocationAutocomplete list */
    noSuggestionsPlaceholder: string;
    /** function to be executed if error occurs while fetching suggestions */
    onLocationAutocompleteError: () => void;
    /** string to be displayed in FieldWrapper when the modal is closed, but locations are selected */
    selectionPlaceholder?: string;
    /** label for the Done button */
    doneLabel: string;
    /** label to be used on the clear all button */
    clearLabel: string;
    /** function called with location object as an argument when it is selected from the suggestions */
    onAddLocation: (Location) => void;
    /** function called with a location details as an argument to be changed */
    onUpdateLocation: (Location) => void;
    /** function with a locationId as an argument to be removed */
    onRemoveLocation: (Location) => void;
    /** callback function for the Clear button click */
    onRemoveAllLocations: () => void;
    /** callback function for closed modal */
    onBlur: () => void;
}

export const LocationSelector: React.FC<Props> = (props) => {
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
        hasRadius,
        minRadius,
        maxRadius,
        radiusStep,
        renderRadiusLabel,
        doneLabel,

        /** LocationAutocomplete props */
        country,
        initialMapAddress,
        placeTypes,
        noSuggestionsPlaceholder,
        showCountryInSuggestions,
        onLocationAutocompleteError,

        /** Internal use */
        singleLocation,
        selectedLocations,
        radiusDefaultValue,
        radiusUnits,
        onAddLocation,
        onUpdateLocation,
        onRemoveLocation,
        onBlur,
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
                <MultiLocationSelector
                    apiKey={apiKey}
                    language={language}
                    region={region}
                    {...additionalGoogleProps}
                    inputPlaceholder={inputPlaceholder}
                    hasRadius={hasRadius}
                    minRadius={minRadius}
                    maxRadius={maxRadius}
                    radiusStep={radiusStep}
                    radiusDefaultValue={radiusDefaultValue}
                    radiusUnits={radiusUnits}
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
                    onAddLocation={onAddLocation}
                    onCloseModal={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

LocationSelector.displayName = 'LocationSelector';

LocationSelector.defaultProps = {
    hasRadius: true,
    radiusDefaultValue: 1,
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
    singleLocation: false,
    initialMapAddress: undefined,
    selectedLocations: [],
    showCountryInSuggestions: true,
    onBlur: () => null,
    additionalGoogleProps: {},
    region: undefined,
    placeTypes: ['(regions)'],
    onLocationAutocompleteError: () => null,
};
