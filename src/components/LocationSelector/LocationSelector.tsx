import * as React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { bem } from '../../utils';
import { Modal } from '../Modal';
import { FieldWrapper } from '../FieldWrapper';
import { LocationSelectorDialogWithGoogleLoader } from './LocationSelectorDialogWithGoogleLoader';
import {
    findCenter,
    getRadiusInMeters,
    convertCoordinatesIntoAddress,
    LocationSelectorLocation,
} from './utils';
import { ENTER_KEY, ESCAPE_KEY } from '../../constants';
import { useBrowserTabVisibilityChange } from '../../hooks';
import styles from './LocationSelector.scss';

const { block, elem } = bem('LocationSelector', styles);

interface Props {
    /** define id for input element */
    id?: string;
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
    /** defines if selector has an option of opening the modal window by pressing Enter button */
    openOnEnterPress: boolean;
    /** stores an array of selected location objects */
    selectedLocations: LocationSelectorLocation[];
    /** defines if selector has an option to control the radius for a marker */
    hasRadius?: boolean;
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
    /** defines if selector has a list of locations cards to render */
    withoutLocationCards?: boolean;
    /** country where search can take place */
    country?: string;
    /** address to make initial map centering more specific */
    initialMapAddress?: string;
    /**
     * type of locations that should be searched for.
     * For details see: https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest.types
     */
    placeTypes?: string[];
    /** show country name in autocomplete suggestions */
    showCountryInSuggestions?: boolean;
    /** defines if an additional request should be done in order to get address information for selected location */
    shouldGetAddressInfo?: boolean;
    /** A title for the modal that will be used by screenreaders */
    modalContentLabel: string;
    /** placeholder for both main field and autocomplete field in modal */
    inputPlaceholder: string;
    /** placeholder for autocomplete field inside the modal. If not given inputPlaceholder will be used */
    modalInputPlaceholder?: string;
    /** placeholder for empty LocationAutocomplete list */
    noSuggestionsPlaceholder: string;
    /** function to be executed if error occurs while fetching suggestions */
    onLocationAutocompleteError: () => void;
    /** string to be displayed in FieldWrapper when the modal is closed, but locations are selected */
    selectionPlaceholder?: string;
    /** label for the Done button */
    doneLabel: string;
    /** label to be used for Clear buttons of the component */
    clearLabel: string;
    /** function called with location object as an argument when it is selected from the suggestions */
    onAddLocation: (location: LocationSelectorLocation) => void;
    /** function called with a location details as an argument to be changed */
    onUpdateLocation: (location: LocationSelectorLocation) => void;
    /** function with a locationId as an argument to be removed */
    onRemoveLocation: (location: LocationSelectorLocation) => void;
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
        id,
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
        modalInputPlaceholder,
        country,
        initialMapAddress,
        placeTypes,
        noSuggestionsPlaceholder,
        showCountryInSuggestions,
        onLocationAutocompleteError,

        /** Internal use */
        openOnEnterPress,
        selectedLocations,
        radiusDefaultValue,
        radiusUnits,
        shouldGetAddressInfo,
        withoutLocationCards,
        onAddLocation,
        onUpdateLocation,
        onRemoveLocation,
        onBlur,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = React.useState(false);
    const [isWrapperFocused, setIsWrapperFocused] = React.useState(false);
    const isBrowserTabVisible = useBrowserTabVisibilityChange();
    const buttonRef = React.useRef<HTMLButtonElement>();

    const hasLocationsSelected = selectedLocations && selectedLocations.length > 0;

    function handleOpenModal() {
        if (!isOpen && !isWrapperFocused && isBrowserTabVisible) {
            buttonRef.current?.focus();
            setIsOpen(true);
        }
        setIsWrapperFocused(true);
    }

    function handleCloseModal() {
        if (isOpen && isBrowserTabVisible) {
            setIsOpen(false);
            onBlur();
        }
    }

    function handleButtonKeyPress(e: React.KeyboardEvent<HTMLButtonElement>) {
        if (e.key === ESCAPE_KEY) {
            buttonRef.current?.blur();
        } else if (e.key === ENTER_KEY) {
            if (openOnEnterPress && selectedLocations.length === 0) {
                setIsOpen(true);
            } else {
                // the snippet below looks up for a wrapping form which allows the component
                // to submit it by hitting Enter and to behave like a real input
                const target = e.target as HTMLButtonElement;
                if (target.form) {
                    const form = target.form as HTMLElement;
                    (form.querySelector('[type="submit"]') as HTMLButtonElement).click();
                }
            }
        }
    }

    function handleButtonBlur() {
        if (!isOpen) {
            setIsWrapperFocused(false);
        }
    }

    /**
     * Fetch additional information for the selected place and
     * add it along with passed location object to the selectedLocations array
     * if this location was not selected yet
     */
    function handleAddLocation(location: LocationSelectorLocation) {
        return findCenter(location.place_id)
            .then((center) => {
                const lng = center.lng();
                const lat = center.lat();
                const isLocationSelected = selectedLocations
                    .map((item) => item.place_id)
                    .includes(location.place_id);
                const locationToAdd: LocationSelectorLocation = {
                    ...location,
                    id: location.place_id,
                    center: { lat, lng },
                    radius: hasRadius && radiusDefaultValue ? radiusDefaultValue : 0,
                };

                if (!isLocationSelected) {
                    if (shouldGetAddressInfo) {
                        convertCoordinatesIntoAddress({ lat, lng }).then(
                            // eslint-disable-next-line @typescript-eslint/camelcase
                            ({ address_components }) => {
                                onAddLocation({
                                    ...locationToAdd,
                                    addressComponents: address_components,
                                });
                            }
                        );
                    } else {
                        onAddLocation(locationToAdd);
                    }
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
        <div {...rest} {...block(props)}>
            <FieldWrapper
                {...elem('mainTextButtonWrapper', props)}
                isFocused={isWrapperFocused}
                showClearButton={hasLocationsSelected}
                clearLabel={clearLabel}
                onClick={handleOpenModal}
                onClear={onRemoveAllLocations}
            >
                <FaMapMarkerAlt {...elem('icon', props)} />
                <button
                    id={id}
                    ref={buttonRef}
                    type="button"
                    {...elem('mainTextButton', { ...props, muted: !selectionPlaceholder })}
                    onFocus={handleOpenModal}
                    onBlur={handleButtonBlur}
                    onKeyUp={handleButtonKeyPress}
                >
                    {selectionPlaceholder || inputPlaceholder}
                </button>
            </FieldWrapper>
            <Modal
                {...elem('modal', props)}
                isOpen={isOpen}
                ariaHideApp={false}
                onRequestClose={handleCloseModal}
                contentLabel={modalContentLabel}
                isPositionFixed
            >
                <LocationSelectorDialogWithGoogleLoader
                    apiKey={apiKey}
                    language={language}
                    region={region}
                    {...additionalGoogleProps}
                    inputPlaceholder={modalInputPlaceholder || inputPlaceholder}
                    hasRadius={hasRadius}
                    minRadius={minRadius}
                    maxRadius={maxRadius}
                    radiusStep={radiusStep}
                    renderRadiusLabel={renderRadiusLabel}
                    onRemoveLocation={onRemoveLocation}
                    doneLabel={doneLabel}
                    clearLabel={clearLabel}
                    country={country}
                    withoutLocationCards={withoutLocationCards}
                    initialMapAddress={initialMapAddress}
                    placeTypes={placeTypes}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    showCountryInSuggestions={showCountryInSuggestions}
                    onLocationAutocompleteError={onLocationAutocompleteError}
                    onUpdateLocation={onUpdateLocation}
                    onRemoveAllLocations={onRemoveAllLocations}
                    selectedLocations={selectedLocations}
                    getMarkers={getMarkers}
                    onAddLocation={handleAddLocation}
                    onCloseModal={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

LocationSelector.displayName = 'LocationSelector';

LocationSelector.defaultProps = {
    hasRadius: true,
    openOnEnterPress: true,
    radiusDefaultValue: 1,
    country: undefined,
    minRadius: 1,
    maxRadius: 100,
    radiusStep: 1,
    withoutLocationCards: false,
    initialMapAddress: undefined,
    selectedLocations: [],
    showCountryInSuggestions: true,
    shouldGetAddressInfo: false,
    onBlur: () => null,
    additionalGoogleProps: {},
    region: undefined,
    placeTypes: ['(regions)'],
    onLocationAutocompleteError: () => null,
};
