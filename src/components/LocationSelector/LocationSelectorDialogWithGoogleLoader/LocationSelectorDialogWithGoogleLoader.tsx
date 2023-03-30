import * as React from 'react';
import { LoadScriptNext, LoadScriptNextProps } from '@react-google-maps/api';
import { LoadingSpinner } from '../../LoadingSpinner';
import { LocationSelectorDialog, LocationSelectorDialogProps } from '../LocationSelectorDialog';
import { GOOGLE_API_LIBRARIES } from '../utils';

interface Props extends LocationSelectorDialogProps {
    /** Google api key */
    apiKey: string;
    /** language in which suggestions should be displayed */
    language: string;
    /** Regional setting for the map. By default Google uses US.
     * For details see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region?: string;
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps?: LoadScriptNextProps; // eslint-disable-line react/forbid-prop-types
}

const LocationSelectorDialogWithGoogleLoader: React.FC<Props> = ({
    /** Google props */
    apiKey,
    language,
    region = undefined,
    additionalGoogleProps = {},

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
    initialMapAddress,
    placeTypes,
    noSuggestionsPlaceholder,
    showCountryInSuggestions,
    onLocationAutocompleteError,

    /** Map props */
    defaultHighlight,

    /** Internal use */
    withoutLocationCards,
    onCloseModal,
    onAddLocation,
    onUpdateLocation,
    onRemoveAllLocations,
    selectedLocations,
    inputPlaceholder,
    getMarkers,
}) => {
    const { googleMapsApiKey: removedProperty, ...additionalGoogleRestProps } =
        additionalGoogleProps;
    return (
        <LoadScriptNext
            googleMapsApiKey={apiKey}
            language={language}
            region={region}
            loadingElement={<LoadingSpinner centerIn="parent" />}
            libraries={GOOGLE_API_LIBRARIES}
            {...additionalGoogleRestProps}
        >
            <LocationSelectorDialog
                inputPlaceholder={inputPlaceholder}
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
                selectedLocations={selectedLocations}
                getMarkers={getMarkers}
                onAddLocation={onAddLocation}
                onRemoveAllLocations={onRemoveAllLocations}
                onCloseModal={onCloseModal}
            />
        </LoadScriptNext>
    );
};

LocationSelectorDialogWithGoogleLoader.displayName = 'LocationSelectorDialogWithGoogleLoader';

export {
    LocationSelectorDialogWithGoogleLoader,
    Props as LocationSelectorDialogWithGoogleLoaderProps,
};
