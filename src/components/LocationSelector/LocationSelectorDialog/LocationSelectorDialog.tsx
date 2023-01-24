import * as React from 'react';
import { bem } from '../../../utils';
import { LocationCard, LocationCardProps } from '../../LocationCard';
import { Text } from '../../Text';
import { Slider } from '../../Sliders';
import { Button } from '../../Buttons';
import { LocationAutocomplete, LocationAutocompleteProps } from '../../LocationAutocomplete';
import { Map, CircularMarker } from '../../Map';
import { SIZES, ENTER_KEY } from '../../../constants';
import styles from './LocationSelectorDialog.scss';
import { LocationSelectorLocation } from '../utils';

// Props for child components that we just push through with prop-drilling
type CardPropsForSelectorDialog = Pick<
    LocationCardProps,
    | 'locationId'
    | 'hasRadius'
    | 'sliderLabel'
    | 'minRadius'
    | 'maxRadius'
    | 'radiusStep'
    | 'onRadiusChange'
>;

type AutocompletePropsForSelectorDialog = Pick<
    LocationAutocompleteProps,
    | 'inputPlaceholder'
    | 'noSuggestionsPlaceholder'
    | 'isFocused'
    | 'clearTooltipLabel'
    | 'country'
    | 'placeTypes'
    | 'showCountryInSuggestions'
    | 'onRemoveAllLocations'
>;

interface Props extends CardPropsForSelectorDialog, AutocompletePropsForSelectorDialog {
    /** defines if location cards should be rendered or not */
    withoutLocationCards?: boolean;
    /** stores an array of selected location objects */
    selectedLocations: LocationSelectorLocation[];
    /** radius label renderer e.g. radius => `+ ${radius} km` */
    renderRadiusLabel: (radius: number) => string;
    /** address to make initial map centering more specific */
    initialMapAddress?: string;
    /** function to be executed if error occurs while fetching suggestions */
    onLocationAutocompleteError?: (status: google.maps.places.PlacesServiceStatus) => void; // LocationAutocompleteProps.onError
    /** label for the Done button */
    doneLabel: string;
    /** function called with location object as an argument when it is selected from the suggestions */
    onAddLocation: (location: LocationSelectorLocation) => void; // LocationAutocompleteProps.onSelectionChange
    /** function called with a location details as an argument to be changed */
    onUpdateLocation: (locationId: string | undefined, radius: number) => void; // LocationCardProps.onRadiusChange
    /** function with a locationId as an argument to be removed */
    onRemoveLocation: (locationId: string | undefined) => void; // LocationCardProps.onDelete
    /** function to calculate marker positions in Map  */
    getMarkers?: () => CircularMarker[];
    /** function to be called when teh Done button is clicked */
    onCloseModal?: () => void;
    /** A geoJson description of the area that should be highlighted when there are no other markers present */
    defaultHighlight?: GeoJSON.GeoJsonObject; // MapProps.defaultHighlight
}

const { elem } = bem('LocationSelectorDialog', styles);

const LocationSelectorDialog: React.FC<Props> = ({
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
    clearTooltipLabel,

    /** LocationAutocomplete props */
    country,
    initialMapAddress = null,
    defaultHighlight = undefined,
    placeTypes,
    noSuggestionsPlaceholder,
    showCountryInSuggestions,
    onLocationAutocompleteError = null,

    /** Internal use */
    withoutLocationCards = false,
    onUpdateLocation,
    selectedLocations,
    getMarkers = () => undefined,
    onAddLocation,
    onRemoveAllLocations,
    onCloseModal = () => null,
}) => {
    const locationInputRef = React.createRef<HTMLInputElement>();

    const [firstSelectedLocation] = selectedLocations;

    function getDefaultArea() {
        if (initialMapAddress || country) {
            return { address: initialMapAddress || country };
        }

        return undefined;
    }

    function handleAddLocation(location) {
        if (locationInputRef.current && !withoutLocationCards) {
            setTimeout(() => locationInputRef.current?.focus());
        }
        onAddLocation(location);
    }

    function handleRemoveLocation(locationId) {
        if (locationInputRef.current) {
            locationInputRef.current.focus();
        }
        onRemoveLocation(locationId);
    }

    function handleRadiusChange(radius) {
        onUpdateLocation(firstSelectedLocation.id, radius);
    }

    function handleInputFormSubmit(e) {
        if (e.key === ENTER_KEY) {
            e.stopPropagation();
            onCloseModal?.();
        }
    }

    return (
        <>
            <div {...elem('inputLine')} role="presentation" onKeyDown={handleInputFormSubmit}>
                <LocationAutocomplete
                    {...elem('searchField')}
                    isFocused
                    inputRef={locationInputRef}
                    defaultInputValue={
                        withoutLocationCards && firstSelectedLocation
                            ? firstSelectedLocation.description
                            : ''
                    }
                    inputPlaceholder={inputPlaceholder}
                    clearTooltipLabel={clearTooltipLabel}
                    noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                    onSelectionChange={handleAddLocation}
                    country={country}
                    placeTypes={placeTypes}
                    singleLocation={withoutLocationCards}
                    showCountryInSuggestions={showCountryInSuggestions}
                    onRemoveAllLocations={onRemoveAllLocations}
                    onError={onLocationAutocompleteError}
                    hidePoweredByGoogleLogo
                />
                {hasRadius && withoutLocationCards && selectedLocations.length === 1 && (
                    <div {...elem('slider')}>
                        <Slider
                            value={firstSelectedLocation.radius}
                            min={minRadius}
                            max={maxRadius}
                            step={radiusStep}
                            railStyle={{ backgroundColor: 'var(--color-neutral-25)' }}
                            onChange={handleRadiusChange}
                        />
                        <Text size={SIZES[0]} {...elem('sliderLabel')}>
                            {renderRadiusLabel(firstSelectedLocation.radius)}
                        </Text>
                    </div>
                )}
                <Button {...elem('button')} onClick={onCloseModal} isPrimary>
                    {doneLabel}
                </Button>
            </div>
            <div {...elem('locationsWrapper')}>
                {!withoutLocationCards && selectedLocations.length > 0 && (
                    <ul {...elem('locationCardsContainer')}>
                        {selectedLocations.map((location) => (
                            <LocationCard
                                {...elem('locationCard')}
                                As="li"
                                key={location.id}
                                locationId={location.id}
                                locationTitle={location.description}
                                distanceRadius={location.radius}
                                sliderLabel={renderRadiusLabel(location.radius)}
                                hasRadius={hasRadius}
                                minRadius={minRadius}
                                maxRadius={maxRadius}
                                radiusStep={radiusStep}
                                onRadiusChange={onUpdateLocation}
                                onDelete={handleRemoveLocation}
                            />
                        ))}
                    </ul>
                )}
                <Map
                    defaultArea={getDefaultArea()}
                    markers={getMarkers?.()}
                    defaultHighlight={defaultHighlight}
                />
            </div>
        </>
    );
};

LocationSelectorDialog.displayName = 'LocationSelectorDialog';

export { LocationSelectorDialog, Props as LocationSelectorDialogProps };
