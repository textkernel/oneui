import * as React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { bem } from '../../utils';
import { Modal } from '../Modal';
import { FieldWrapper } from '../FieldWrapper';
import {
    LocationSelectorDialogWithGoogleLoader,
    LocationSelectorDialogWithGoogleLoaderProps,
} from './LocationSelectorDialogWithGoogleLoader';
import {
    findGeoCenterForPlaceId,
    getRadiusInMeters,
    convertCoordinatesIntoAddress,
    LocationSelectorLocation,
} from './utils';
import { ENTER_KEY, ESCAPE_KEY } from '../../constants';
import { useBrowserTabVisibilityChange } from '../../hooks';
import styles from './LocationSelector.scss';

const { block, elem } = bem('LocationSelector', styles);

interface Props
    extends LocationSelectorDialogWithGoogleLoaderProps,
        React.HTMLAttributes<HTMLDivElement> {
    /** define id for input element */
    id?: string;
    /** defines if selector has an option of opening the modal window by pressing Enter button */
    openOnEnterPress?: boolean;
    /** default radius value */
    radiusDefaultValue?: number;
    /** radius measurement unit */
    radiusUnits: 'km' | 'mi';
    /** country where search can take place */
    country?: string;
    /** defines if an additional request should be done in order to get address information for selected location */
    shouldGetAddressInfo?: boolean;
    /** A title for the modal that will be used by screenreaders */
    modalContentLabel: string;
    /** placeholder for both main field and autocomplete field in modal */
    inputPlaceholder: string;
    /** placeholder for autocomplete field inside the modal. If not given inputPlaceholder will be used */
    modalInputPlaceholder?: string;
    /** string to be displayed in FieldWrapper when the modal is closed, but locations are selected */
    selectionPlaceholder?: string;
    /** label to be used for Clear buttons of the component */
    clearTooltipLabel: string;
    /** callback function for the Clear button click */
    onRemoveAllLocations: () => void;
    /** callback function for closed modal */
    onBlur?: () => void;
}

const LocationSelector: React.FC<Props> = ({
    /** Google props */
    apiKey,
    language,
    region = undefined,
    additionalGoogleProps = undefined,

    /** FieldWrapper props */
    id,
    clearTooltipLabel,
    onRemoveAllLocations,
    inputPlaceholder,
    selectionPlaceholder,

    /** Modal props */
    modalContentLabel,

    /** LocationCard props */
    hasRadius,
    minRadius = 1,
    maxRadius = 100,
    radiusStep = 1,
    renderRadiusLabel,
    doneLabel,

    /** LocationAutocomplete props */
    modalInputPlaceholder,
    country = undefined,
    initialMapAddress = undefined,
    placeTypes = ['(regions)'],
    noSuggestionsPlaceholder,
    showCountryInSuggestions,
    onLocationAutocompleteError = () => null,

    /** Map props */
    defaultHighlight = undefined,

    /** Internal use */
    openOnEnterPress = true,
    selectedLocations = [],
    radiusDefaultValue = 1,
    radiusUnits,
    shouldGetAddressInfo = false,
    withoutLocationCards = false,
    onAddLocation,
    onUpdateLocation,
    onRemoveLocation,
    onBlur = () => null,
    ...rest
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isWrapperFocused, setIsWrapperFocused] = React.useState(false);
    const isBrowserTabVisible = useBrowserTabVisibilityChange();
    const buttonRef = React.useRef<HTMLButtonElement>();

    const hasLocationsSelected = selectedLocations && selectedLocations.length > 0;

    const handleOpenModal = () => {
        if (!isOpen && !isWrapperFocused && isBrowserTabVisible) {
            buttonRef.current?.focus();
            setIsOpen(true);
        }
        setIsWrapperFocused(true);
    };

    const handleCloseModal = () => {
        if (isOpen && isBrowserTabVisible) {
            setIsOpen(false);
            onBlur?.();
        }
    };

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
    const handleAddLocation = (location: LocationSelectorLocation) => {
        return findGeoCenterForPlaceId(location.place_id)
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
    };

    const getMarkers = () => {
        return selectedLocations.map((location) => ({
            description: location.description,
            center: location.center,
            radius: hasRadius ? getRadiusInMeters(location.radius, radiusUnits) : 0,
        }));
    };

    return (
        <div {...rest} {...block({ ...rest })}>
            <FieldWrapper
                {...elem('mainTextButtonWrapper')}
                title={selectionPlaceholder || inputPlaceholder}
                isFocused={isWrapperFocused}
                showClearButton={hasLocationsSelected}
                clearTooltipLabel={clearTooltipLabel}
                onClick={handleOpenModal}
                onClear={onRemoveAllLocations}
            >
                <FaMapMarkerAlt {...elem('icon')} />
                <button
                    id={id}
                    ref={buttonRef}
                    type="button"
                    {...elem('mainTextButton', { muted: !selectionPlaceholder })}
                    onFocus={handleOpenModal}
                    onBlur={handleButtonBlur}
                    onKeyUp={handleButtonKeyPress}
                >
                    {selectionPlaceholder || inputPlaceholder}
                </button>
            </FieldWrapper>
            <Modal
                {...elem('modal')}
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
                    clearTooltipLabel={clearTooltipLabel}
                    country={country}
                    withoutLocationCards={withoutLocationCards}
                    initialMapAddress={initialMapAddress}
                    defaultHighlight={defaultHighlight}
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

export { LocationSelector, Props as LocationSelectorProps };
