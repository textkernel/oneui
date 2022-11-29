import * as React from 'react';
import { LoadScriptNext, LoadScriptNextProps } from '@react-google-maps/api';
import { LoadingSpinner } from '../LoadingSpinner';
import { LocationAutocomplete, LocationAutocompleteProps } from './LocationAutocomplete';

interface Props extends LocationAutocompleteProps {
    /** Google API key */
    apiKey: string;
    /**
     * The language code to be used for the map (e.g en). By default the users browser language will be used
     * For available values see: https://developers.google.com/maps/faq#languagesupport
     */
    language?: string;
    /** Regional setting for the map. By default Google uses US.
     * For details see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region?: string;
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps?: Omit<LoadScriptNextProps, 'googleMapsApiKey'>;
}

// for details see: https://developers.google.com/maps/documentation/javascript/libraries
const GOOGLE_API_LIBRARIES: (
    | 'drawing'
    | 'geometry'
    | 'localContext'
    | 'places'
    | 'visualization'
)[] = ['places'];

const LocationAutocompleteWithGoogleLoader: React.FC<Props> = ({
    apiKey,
    language = undefined,
    region = undefined,
    additionalGoogleProps = {},
    ...rest
}) => {
    return (
        <LoadScriptNext
            googleMapsApiKey={apiKey}
            language={language}
            region={region}
            loadingElement={<LoadingSpinner centerIn="parent" />}
            libraries={GOOGLE_API_LIBRARIES}
            {...additionalGoogleProps}
        >
            <LocationAutocomplete {...rest} />
        </LoadScriptNext>
    );
};

LocationAutocompleteWithGoogleLoader.displayName = 'LocationAutocompleteWithGoogleLoader';

export { LocationAutocompleteWithGoogleLoader, Props as LocationAutocompleteWithGoogleLoaderProps };
